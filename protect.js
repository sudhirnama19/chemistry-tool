(function(){
    const _D="sudhirnama.in";
    const _LS="sn_lk";
    let _unlocked=false;
    let _threatScore=0;
    let _enforceTimer=null;

    function _dOK(){
        try{
            const h=location.hostname.replace(/^www\./,"");
            return h===_D||h.endsWith("."+_D);
        }catch(e){return false;}
    }

    function _H(s){
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

    const _REAL=[_H("SN-29XK-8D2P"),_H("SN-AB12-X9Q7")];
    const _REAL_TOKENS=[
        _H(_H("SN-29XK-8D2P")+"sn_salt_v4"),
        _H(_H("SN-AB12-X9Q7")+"sn_salt_v4")
    ];
    const _DECOY=[_H("SN-XXXX-1111"),_H("SN-0000-TEST"),_H("SN-FAKE-9999"),_H("SN-AAAA-BBBB")];

    function _saveSession(key){
        try{
            const token=_H(_H(key.trim().toUpperCase())+"sn_salt_v4");
            localStorage.setItem(_LS,token);
            sessionStorage.setItem(_LS,token);
        }catch(e){}
    }

    function _checkSession(){
        try{
            const ls=localStorage.getItem(_LS);
            const ss=sessionStorage.getItem(_LS);
            if(!ls||!ss||ls!==ss)return false;
            return _REAL_TOKENS.includes(ls);
        }catch(e){return false;}
    }

    function _VK(k){
        const x=_H(k.trim().toUpperCase());
        if(_REAL.includes(x))return true;
        if(_DECOY.includes(x)){_threatScore+=3;return false;}
        _threatScore++;
        return false;
    }

    function _unlock(){
        _unlocked=true;
        if(_enforceTimer){clearInterval(_enforceTimer);_enforceTimer=null;}
        const ov=document.getElementById("sn_overlay");
        if(ov)ov.remove();
        const warn=document.getElementById("sn_warn");
        if(warn)warn.remove();
        // Re-enable ALL page elements
        document.querySelectorAll("button,input,select,textarea").forEach(function(el){
            el.disabled=false;
            el.style.pointerEvents="";
            el.style.opacity="";
        });
    }

    // ⚠️ FIX: Popup element IDs to NEVER disable
    const _POPUP_IDS=["sn_keybtn","sn_keyinput"];

    function _lock(){
        if(_unlocked)return;

        // FIX: Only disable PAGE elements, skip popup elements
        document.querySelectorAll("button,input,select,textarea").forEach(function(el){
            if(_POPUP_IDS.indexOf(el.id)!==-1)return; // skip popup elements
            el.disabled=true;
            el.style.pointerEvents="none";
            el.style.opacity="0.4";
        });

        Object.keys(window).forEach(function(k){
            if(typeof window[k]==="function"&&/calc|compute|result|solve|molar|mol|convert/i.test(k)){
                window[k]=function(){return (Math.random()*9999).toFixed(4);};
            }
        });

        if(!document.getElementById("sn_warn")){
            const d=document.createElement("div");
            d.id="sn_warn";
            d.innerHTML="🔐 <strong>Restricted</strong> — Unauthorized copy of <a href='https://chemistrytools.sudhirnama.in' style='color:#ffd;'>chemistrytools.sudhirnama.in</a>";
            d.style.cssText="position:fixed;bottom:0;left:0;right:0;background:#b71c1c;color:#fff;padding:8px 16px;font-size:13px;z-index:2147483647;text-align:center;";
            document.body&&document.body.appendChild(d);
        }

        _showPopup();
    }

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
            "#sn_keyinput{width:100%;padding:10px;margin:14px 0 4px;border:2px solid #ddd;border-radius:7px;font-size:15px;box-sizing:border-box;text-transform:uppercase;letter-spacing:1px;disabled:false!important;}",
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
            +'<h2>⚠️ Unauthorized Copy</h2>'
            +'<p>This tool is only licensed to run on:</p>'
            +'<p><a href="https://chemistrytools.sudhirnama.in" target="_blank">chemistrytools.sudhirnama.in</a></p>'
            +'<div id="sn_warn_box">🚫 You are viewing an <strong>unauthorized copy</strong>.<br>All calculators are disabled on this domain.<br>Visit the original site for free access.</div>'
            +'<p style="font-size:12px;color:#888;">Have a license key? Enter it below:</p>'
            +'<input id="sn_keyinput" type="text" placeholder="SN-XXXX-XXXX" maxlength="20" />'
            +'<button id="sn_keybtn">🔓 Unlock</button>'
            +'<div id="sn_err"></div>'
            +'<p style="margin-top:16px;font-size:11px;color:#aaa;">© <a href="https://chemistrytools.sudhirnama.in" target="_blank">Chemistry Tools by Sudhir Nama</a></p>'
            +'</div>';
        document.body&&document.body.appendChild(ov);

        // FIX: Force popup elements always enabled after appending
        const btn=document.getElementById("sn_keybtn");
        const inp=document.getElementById("sn_keyinput");
        const err=document.getElementById("sn_err");

        btn.disabled=false;
        inp.disabled=false;
        btn.style.pointerEvents="auto";
        inp.style.pointerEvents="auto";
        btn.style.opacity="1";
        inp.style.opacity="1";

        btn.addEventListener("click",function(){
            const k=inp.value.trim();
            if(!k){err.textContent="Please enter a license key.";return;}
            btn.disabled=true;
            btn.textContent="Checking...";
            err.textContent="";
            setTimeout(function(){
                if(_VK(k)){
                    _saveSession(k);
                    _unlock();
                }else{
                    btn.disabled=false;
                    btn.textContent="🔓 Unlock";
                    // FIX: Re-ensure popup stays enabled after failed attempt
                    inp.disabled=false;
                    inp.style.pointerEvents="auto";
                    inp.style.opacity="1";
                    err.textContent=_threatScore>3
                        ?"⛔ Too many failed attempts."
                        :"❌ Invalid key. Visit the original site for free access.";
                    if(_threatScore>5)_lock();
                }
            },600+Math.random()*400);
        });

        inp.addEventListener("keydown",function(e){
            if(e.key==="Enter")btn.click();
        });

        setTimeout(function(){inp.focus();},100);
    }

    function _dtCheck(){
        if(window.outerWidth-window.innerWidth>160||window.outerHeight-window.innerHeight>160){
            _threatScore++;
            if(_threatScore>3&&!_unlocked)_lock();
        }
    }

    function _enforce(){
        if(!_unlocked){
            _lock();
            // FIX: After every enforce cycle, re-enable popup elements
            var btn=document.getElementById("sn_keybtn");
            var inp=document.getElementById("sn_keyinput");
            if(btn){btn.disabled=false;btn.style.pointerEvents="auto";btn.style.opacity="1";}
            if(inp){inp.disabled=false;inp.style.pointerEvents="auto";inp.style.opacity="1";}
        }
        _dtCheck();
    }

    try{
        Object.defineProperty(window,"__sn_flag__",{value:"protected_v4",writable:false,configurable:false});
    }catch(e){}

    function _init(){
        if(_dOK()){_unlocked=true;return;}
        if(_checkSession()){_unlocked=true;return;}
        setTimeout(function(){
            _lock();
            _enforceTimer=setInterval(_enforce,2500);
        },800);
    }

    if(document.readyState==="loading"){
        document.addEventListener("DOMContentLoaded",_init);
    }else{
        _init();
    }
})();
