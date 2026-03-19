(function(){

    /* ============================================================
       LAYER 1: FREEZE NATIVE METHODS FIRST
       Prevents developer from overriding clearInterval,
       console, or other natives before our code runs
    ============================================================ */
    const _si  = window.setInterval.bind(window);
    const _ci  = window.clearInterval.bind(window);
    const _st  = window.setTimeout.bind(window);
    const _ral = window.requestAnimationFrame
                 ? window.requestAnimationFrame.bind(window)
                 : function(fn){_st(fn,16);};

    // Freeze console to prevent easy debugging
    try{
        ["log","warn","error","info","debug","table","dir"].forEach(function(m){
            try{ Object.defineProperty(console,m,{value:function(){},writable:false,configurable:false}); }catch(e){}
        });
    }catch(e){}


    /* ============================================================
       LAYER 2: CONFIG — split domain to avoid easy string search
    ============================================================ */
    const _P1="sudhir";
    const _P2="nama";
    const _P3=".in";
    const _D=_P1+_P2+_P3;           // sudhirnama.in
    const _LS="sn_lk";
    const _SS="sn_sk";

    // Use object with getter instead of simple boolean
    // Harder to patch via prototype
    const _STATE={
        _v:false,
        _t:0,
        _timer:null,
        get unlocked(){return this._v===true&&typeof this._v==="boolean";},
        set unlocked(v){if(typeof v==="boolean")this._v=v;}
    };


    /* ============================================================
       LAYER 3: CUSTOM DOUBLE HASH
       Two different hash algorithms combined —
       much harder to identify and brute force
    ============================================================ */
    function _H1(s){
        let h1=0xdeadbeef^s.length,h2=0x41c6ce57^s.length;
        for(let i=0;i<s.length;i++){
            let c=s.charCodeAt(i);
            h1=Math.imul(h1^c,2654435761);
            h2=Math.imul(h2^c,1597334677);
        }
        h1=Math.imul(h1^(h1>>>16),2246822507);
        h2=Math.imul(h2^(h2>>>13),3266489909);
        return (h2>>>0).toString(36)+(h1>>>0).toString(36);
    }

    function _H2(s){
        let h=5381;
        for(let i=0;i<s.length;i++){
            h=((h<<5)+h)^s.charCodeAt(i);
            h=h&h;
        }
        return (h>>>0).toString(36);
    }

    // Combined hash — attacker must reverse BOTH algorithms
    function _H(s){
        return _H1(s+_H2(s))+_H2(_H1(s));
    }


    /* ============================================================
       LAYER 4: KEYS
    ============================================================ */
    const _REAL=[_H("SN-29XK-8D2P"),_H("SN-AB12-X9Q7")];
    const _REAL_TOKENS=[
        _H(_H("SN-29XK-8D2P")+"sn_salt_v5"),
        _H(_H("SN-AB12-X9Q7")+"sn_salt_v5")
    ];
    const _DECOY=[
        _H("SN-XXXX-1111"),_H("SN-0000-TEST"),
        _H("SN-FAKE-9999"),_H("SN-AAAA-BBBB")
    ];


    /* ============================================================
       LAYER 5: DOMAIN CHECK
       Multiple checks + iframe detection + timing safe compare
    ============================================================ */
    function _dOK(){
        try{
            // Check 1: iframe detection — if in iframe, domain check parent too
            if(window.self!==window.top){
                try{
                    const ph=window.top.location.hostname.replace(/^www\./,"");
                    if(ph!==_D&&!ph.endsWith("."+_D))return false;
                }catch(e){
                    return false; // cross-origin iframe — block
                }
            }
            // Check 2: main domain check
            const h=location.hostname.replace(/^www\./,"");
            if(h!==_D&&!h.endsWith("."+_D))return false;
            // Check 3: protocol check — block file:// clones
            if(location.protocol==="file:")return false;
            return true;
        }catch(e){return false;}
    }


    /* ============================================================
       LAYER 6: SESSION — uses both storages + fingerprint
    ============================================================ */
    function _fingerprint(){
        try{
            // Simple browser fingerprint — ties session to browser
            const nav=navigator;
            return _H2((nav.language||"")+(nav.platform||"")+(screen.colorDepth||"")+(screen.width||""));
        }catch(e){return "x";}
    }

    function _saveSession(key){
        try{
            const token=_H(_H(key.trim().toUpperCase())+"sn_salt_v5"+_fingerprint());
            localStorage.setItem(_LS,token);
            sessionStorage.setItem(_SS,token);
        }catch(e){}
    }

    function _checkSession(){
        try{
            const ls=localStorage.getItem(_LS);
            const ss=sessionStorage.getItem(_SS);
            if(!ls||!ss||ls!==ss)return false;
            // Verify against real tokens with fingerprint
            for(let rk of["SN-29XK-8D2P","SN-AB12-X9Q7"]){
                if(_H(_H(rk)+"sn_salt_v5"+_fingerprint())===ls)return true;
            }
            return false;
        }catch(e){return false;}
    }


    /* ============================================================
       LAYER 7: KEY VALIDATION
    ============================================================ */
    function _VK(k){
        const x=_H(k.trim().toUpperCase());
        if(_REAL.includes(x))return true;
        if(_DECOY.includes(x)){_STATE._t+=3;return false;}
        _STATE._t++;
        return false;
    }


    /* ============================================================
       LAYER 8: UNLOCK
    ============================================================ */
    function _unlock(){
        _STATE.unlocked=true;
        if(_STATE._timer){_ci(_STATE._timer);_STATE._timer=null;}
        const ov=document.getElementById("sn_overlay");
        if(ov)ov.remove();
        const warn=document.getElementById("sn_warn");
        if(warn)warn.remove();
        document.querySelectorAll("button,input,select,textarea").forEach(function(el){
            el.disabled=false;
            el.style.pointerEvents="";
            el.style.opacity="";
        });
    }


    /* ============================================================
       LAYER 9: LOCK
    ============================================================ */
    const _POPUP_IDS=["sn_keybtn","sn_keyinput"];

    function _lock(){
        if(_STATE.unlocked)return;

        document.querySelectorAll("button,input,select,textarea").forEach(function(el){
            if(_POPUP_IDS.indexOf(el.id)!==-1)return;
            el.disabled=true;
            el.style.pointerEvents="none";
            el.style.opacity="0.4";
        });

        // Poison calculator functions
        Object.keys(window).forEach(function(k){
            if(typeof window[k]==="function"&&
               /calc|compute|result|solve|molar|mol|convert|formula|balance/i.test(k)){
                window[k]=function(){return (Math.random()*9999).toFixed(4);};
            }
        });

        // Poison eval and Function constructor to prevent runtime bypasses
        try{
            window.eval=function(){return null;};
            window.Function=function(){return function(){return null;};};
        }catch(e){}

        if(!document.getElementById("sn_warn")){
            const d=document.createElement("div");
            d.id="sn_warn";
            d.innerHTML="This Is <strong>Restricted</strong> — Unauthorized copy of <a href='https://chemistrytools.sudhirnama.in' style='color:#ffd;'>chemistrytools.sudhirnama.in</a>";
            d.style.cssText="position:fixed;bottom:0;left:0;right:0;background:#b71c1c;color:#fff;padding:8px 16px;font-size:13px;z-index:2147483647;text-align:center;";
            document.body&&document.body.appendChild(d);
        }

        _showPopup();
    }


    /* ============================================================
       LAYER 10: POPUP UI
    ============================================================ */
    function _injectStyles(){
        if(document.getElementById("sn_style"))return;
        const s=document.createElement("style");
        s.id="sn_style";
        s.textContent=[
            "#sn_overlay{position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:2147483646;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;}",
            "#sn_box{background:#fff;border-radius:14px;padding:36px 30px;max-width:400px;width:92%;text-align:center;box-shadow:0 10px 50px rgba(0,0,0,0.5);}",
            "#sn_box h2{margin:0 0 6px;color:#b71c1c;font-size:20px;}",
            "#sn_box p{color:#555;font-size:13px;margin:6px 0;}",
            "#sn_box a{color:#1565c0;text-decoration:none;font-weight:bold;}",
            "#sn_keyinput{width:100%;padding:10px;margin:14px 0 4px;border:2px solid #ddd;border-radius:7px;font-size:15px;box-sizing:border-box;text-transform:uppercase;letter-spacing:1px;}",
            "#sn_keyinput:focus{border-color:#1565c0;outline:none;}",
            "#sn_keybtn{background:#1565c0;color:#fff;border:none;padding:11px 0;border-radius:7px;font-size:15px;cursor:pointer;width:100%;margin-top:4px;font-weight:bold;}",
            "#sn_keybtn:hover{background:#0d47a1;}",
            "#sn_keybtn:disabled{background:#90a4ae;cursor:not-allowed;}",
            "#sn_err{color:#b71c1c;font-size:12px;margin-top:6px;min-height:16px;}",
            "#sn_warn_box{background:#fff8e1;border:1px solid #ffc107;border-radius:7px;padding:10px 12px;margin:12px 0;font-size:12px;color:#e65100;text-align:left;}"
        ].join("");
        document.head&&document.head.appendChild(s);
    }

    function _showPopup(){
        if(document.getElementById("sn_overlay"))return;
        _injectStyles();
        const ov=document.createElement("div");
        ov.id="sn_overlay";
        ov.innerHTML='<div id="sn_box">'
            +'<h2>Unauthorized Copy</h2>'
            +'<p>This tool is only licensed to run on:</p>'
            +'<p><a href="https://chemistrytools.sudhirnama.in" target="_blank">chemistrytools.sudhirnama.in</a></p>'
            +'<div id="sn_warn_box">You are viewing an <strong>unauthorized copy</strong>.<br>All calculators are disabled on this domain.<br>Visit the original site for free access.</div>'
            +'<p style="font-size:12px;color:#888;">Have a license key? Enter it below:</p>'
            +'<input id="sn_keyinput" type="text" placeholder="SN-XXXX-XXXX" maxlength="20" />'
            +'<button id="sn_keybtn">Unlock</button>'
            +'<div id="sn_err"></div>'
            +'<p style="margin-top:16px;font-size:11px;color:#aaa;">© <a href="https://chemistrytools.sudhirnama.in" target="_blank">Chemistry Tools by Sudhir Nama</a></p>'
            +'</div>';
        document.body&&document.body.appendChild(ov);

        const btn=document.getElementById("sn_keybtn");
        const inp=document.getElementById("sn_keyinput");
        const err=document.getElementById("sn_err");

        btn.disabled=false;inp.disabled=false;
        btn.style.pointerEvents="auto";inp.style.pointerEvents="auto";
        btn.style.opacity="1";inp.style.opacity="1";

        btn.addEventListener("click",function(){
            const k=inp.value.trim();
            if(!k){err.textContent="Please enter a license key.";return;}
            btn.disabled=true;
            btn.textContent="Checking...";
            err.textContent="";
            _st(function(){
                if(_VK(k)){
                    _saveSession(k);
                    _unlock();
                }else{
                    btn.disabled=false;
                    btn.textContent="Unlock";
                    inp.disabled=false;inp.style.pointerEvents="auto";inp.style.opacity="1";
                    err.textContent=_STATE._t>3
                        ?"Too many failed attempts."
                        :"Invalid key. Visit the original site for free access.";
                    if(_STATE._t>5)_lock();
                }
            },600+Math.random()*400);
        });

        inp.addEventListener("keydown",function(e){if(e.key==="Enter")btn.click();});
        _st(function(){inp.focus();},100);
    }


    /* ============================================================
       LAYER 11: DEVTOOLS DETECTION — multiple methods
    ============================================================ */
    function _dtCheck(){
        // Method 1: window size difference
        if(window.outerWidth-window.innerWidth>160||
           window.outerHeight-window.innerHeight>160){
            _STATE._t++;
        }
        // Method 2: debugger timing attack
        const t1=performance.now();
        (function(){})();
        const t2=performance.now();
        if(t2-t1>10)_STATE._t++;

        if(_STATE._t>3&&!_STATE.unlocked)_lock();
    }


    /* ============================================================
       LAYER 12: MUTATION OBSERVER
       Detects if someone removes the popup or warning from DOM
    ============================================================ */
    function _startObserver(){
        if(!window.MutationObserver)return;
        const obs=new MutationObserver(function(mutations){
            if(_STATE.unlocked)return;
            for(let m of mutations){
                for(let node of m.removedNodes){
                    if(node.id==="sn_overlay"||node.id==="sn_warn"){
                        // Someone removed our popup — re-lock immediately
                        _st(function(){_lock();},50);
                        return;
                    }
                }
            }
        });
        obs.observe(document.documentElement,{childList:true,subtree:true});
    }


    /* ============================================================
       LAYER 13: ENFORCER
    ============================================================ */
    function _enforce(){
        if(!_STATE.unlocked){
            _lock();
            const btn=document.getElementById("sn_keybtn");
            const inp=document.getElementById("sn_keyinput");
            if(btn){btn.disabled=false;btn.style.pointerEvents="auto";btn.style.opacity="1";}
            if(inp){inp.disabled=false;inp.style.pointerEvents="auto";inp.style.opacity="1";}
        }
        _dtCheck();
    }


    /* ============================================================
       LAYER 14: WATERMARK
    ============================================================ */
    try{
        Object.defineProperty(window,"__sn_flag__",{
            value:"protected_v5",
            writable:false,
            configurable:false,
            enumerable:false  // hidden from Object.keys()
        });
    }catch(e){}


    /* ============================================================
       LAYER 15: INIT
    ============================================================ */
    function _init(){
        if(_dOK()){_STATE.unlocked=true;return;}
        if(_checkSession()){_STATE.unlocked=true;return;}
        _st(function(){
            _lock();
            _startObserver();
            _STATE._timer=_si(_enforce,2500);
        },800);
    }

    if(document.readyState==="loading"){
        document.addEventListener("DOMContentLoaded",_init);
    }else{
        _init();
    }

})();

