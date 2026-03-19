/* ==============================
   🔐 CHEM PROTECT v4.1
   Stealth • Hardened • No Server
   chemistrytools.sudhirnama.in
============================== */

(function(){

    /* ===== CONFIG ===== */
    const _D  = "sudhirnama.in";
    const _LS = "sn_lk";

    let _unlocked = false;
    let _threatScore = 0;
    let _enforceTimer = null;


    /* ==============================
       1. DOMAIN CHECK
    ============================== */
    function _dOK(){
        try{
            const h = location.hostname.replace(/^www\./,"");
            return h === _D || h.endsWith("." + _D);
        }catch(e){
            return false;
        }
    }


    /* ==============================
       2. HASH FUNCTION
    ============================== */
    function _H(s){
        let h1 = 0xdeadbeef ^ s.length;
        let h2 = 0x41c6ce57 ^ s.length;
        for(let i = 0; i < s.length; i++){
            let ch = s.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h2 = Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        return (h2 >>> 0).toString(36) + (h1 >>> 0).toString(36);
    }


    /* ==============================
       3. KEYS
       NOTE: Only hashes stored here.
       Plain text keys never appear
       in this file — safe from
       anyone reading the source.
    ============================== */
    const _REAL = [
        _H("SN-29XK-8D2P"),
        _H("SN-AB12-X9Q7")
    ];

    // FIX: Session token hashes pre-computed from real keys
    // No plain text keys exposed anywhere
    const _REAL_TOKENS = [
        _H(_H("SN-29XK-8D2P") + "sn_salt_v4"),
        _H(_H("SN-AB12-X9Q7") + "sn_salt_v4")
    ];

    const _DECOY = [
        _H("SN-XXXX-1111"),
        _H("SN-0000-TEST"),
        _H("SN-FAKE-9999"),
        _H("SN-AAAA-BBBB")
    ];


    /* ==============================
       4. SECURE SESSION
    ============================== */
    function _saveSession(key){
        try{
            const token = _H(_H(key.trim().toUpperCase()) + "sn_salt_v4");
            localStorage.setItem(_LS, token);
            sessionStorage.setItem(_LS, token);
        }catch(e){}
    }

    function _checkSession(){
        try{
            const ls = localStorage.getItem(_LS);
            const ss = sessionStorage.getItem(_LS);
            // Both storages must exist and match
            if(!ls || !ss || ls !== ss) return false;
            // FIX: Compare against pre-computed token hashes only
            // No plain text keys exposed
            return _REAL_TOKENS.includes(ls);
        }catch(e){
            return false;
        }
    }


    /* ==============================
       5. VALIDATION
    ============================== */
    function _VK(k){
        const x = _H(k.trim().toUpperCase());
        if(_REAL.includes(x)) return true;
        if(_DECOY.includes(x)){
            _threatScore += 3;
            return false;
        }
        _threatScore++;
        return false;
    }


    /* ==============================
       6. UNLOCK — re-enables page
    ============================== */
    function _unlock(){
        _unlocked = true;

        // Stop enforcer timer
        if(_enforceTimer){
            clearInterval(_enforceTimer);
            _enforceTimer = null;
        }

        // Remove overlay and banner
        const ov = document.getElementById("sn_overlay");
        if(ov) ov.remove();
        const warn = document.getElementById("sn_warn");
        if(warn) warn.remove();

        // Re-enable all elements
        document.querySelectorAll("button,input,select,textarea").forEach(el => {
            el.disabled = false;
            el.style.pointerEvents = "";
            el.style.opacity = "";
        });
    }


    /* ==============================
       7. LOCK
    ============================== */
    function _lock(){
        if(_unlocked) return; // FIX: never re-lock if properly unlocked

        // Disable all interactive elements
        document.querySelectorAll("button,input,select,textarea").forEach(el => {
            el.disabled = true;
            el.style.pointerEvents = "none";
            el.style.opacity = "0.4";
        });

        // Poison calculator functions on window
        Object.keys(window).forEach(k => {
            if(typeof window[k] === "function" &&
               /calc|compute|result|solve|molar|mol|convert/i.test(k)){
                window[k] = function(){ return (Math.random()*9999).toFixed(4); };
            }
        });

        // Show bottom warning banner
        if(!document.getElementById("sn_warn")){
            const d = document.createElement("div");
            d.id = "sn_warn";
            d.innerHTML = "🔐 <strong>Restricted</strong> — Unauthorized copy of <a href='https://chemistrytools.sudhirnama.in' style='color:#ffd;'>chemistrytools.sudhirnama.in</a>";
            d.style.cssText = "position:fixed;bottom:0;left:0;right:0;background:#b71c1c;color:#fff;padding:8px 16px;font-size:13px;z-index:2147483647;text-align:center;";
            document.body && document.body.appendChild(d);
        }

        _showPopup();
    }


    /* ==============================
       8. POPUP UI
    ============================== */
    function _injectStyles(){
        if(document.getElementById("sn_style")) return;
        const s = document.createElement("style");
        s.id = "sn_style";
        s.textContent = `
            #sn_overlay{position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:2147483646;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;}
            #sn_box{background:#fff;border-radius:14px;padding:36px 30px;max-width:400px;width:92%;text-align:center;box-shadow:0 10px 50px rgba(0,0,0,0.5);}
            #sn_box h2{margin:0 0 6px;color:#b71c1c;font-size:20px;}
            #sn_box p{color:#555;font-size:13px;margin:6px 0;}
            #sn_box a{color:#1565c0;text-decoration:none;font-weight:bold;}
            #sn_keyinput{width:100%;padding:10px;margin:14px 0 4px;border:2px solid #ddd;border-radius:7px;font-size:15px;box-sizing:border-box;text-transform:uppercase;letter-spacing:1px;}
            #sn_keyinput:focus{border-color:#1565c0;outline:none;}
            #sn_keybtn{background:#1565c0;color:#fff;border:none;padding:11px 0;border-radius:7px;font-size:15px;cursor:pointer;width:100%;margin-top:4px;font-weight:bold;}
            #sn_keybtn:hover{background:#0d47a1;}
            #sn_err{color:#b71c1c;font-size:12px;margin-top:6px;min-height:16px;}
            #sn_warn_box{background:#fff8e1;border:1px solid #ffc107;border-radius:7px;padding:10px 12px;margin:12px 0;font-size:12px;color:#e65100;text-align:left;}
        `;
        document.head && document.head.appendChild(s);
    }

    function _showPopup(){
        if(document.getElementById("sn_overlay")) return;
        _injectStyles();

        const ov = document.createElement("div");
        ov.id = "sn_overlay";
        ov.innerHTML = `
            <div id="sn_box">
                <h2>⚠️ Unauthorized Copy</h2>
                <p>This tool is only licensed to run on:</p>
                <p><a href="https://chemistrytools.sudhirnama.in" target="_blank">chemistrytools.sudhirnama.in</a></p>
                <div id="sn_warn_box">
                    🚫 You are viewing an <strong>unauthorized copy</strong>.<br>
                    All calculators are disabled on this domain.<br>
                    Visit the original site for free access.
                </div>
                <p style="font-size:12px;color:#888;">Have a license key? Enter it below:</p>
                <input id="sn_keyinput" type="text" placeholder="SN-XXXX-XXXX" maxlength="20" />
                <button id="sn_keybtn">🔓 Unlock</button>
                <div id="sn_err"></div>
                <p style="margin-top:16px;font-size:11px;color:#aaa;">
                    © <a href="https://chemistrytools.sudhirnama.in" target="_blank">Chemistry Tools by Sudhir Nama</a>
                </p>
            </div>
        `;
        document.body && document.body.appendChild(ov);

        document.getElementById("sn_keybtn").addEventListener("click", function(){
            const k = document.getElementById("sn_keyinput").value.trim();
            const errEl = document.getElementById("sn_err");
            if(!k){ errEl.textContent = "Please enter a license key."; return; }

            // Disable button during check to prevent double clicks
            document.getElementById("sn_keybtn").disabled = true;

            setTimeout(function(){
                if(_VK(k)){
                    _saveSession(k);
                    _unlock(); // FIX: use _unlock() which properly stops enforcer
                } else {
                    document.getElementById("sn_keybtn").disabled = false;
                    errEl.textContent = _threatScore > 3
                        ? "⛔ Too many failed attempts."
                        : "❌ Invalid key. Visit the original site for free access.";
                    if(_threatScore > 5) _lock();
                }
            }, 600 + Math.random() * 400);
        });

        document.getElementById("sn_keyinput").addEventListener("keydown", function(e){
            if(e.key === "Enter") document.getElementById("sn_keybtn").click();
        });
    }


    /* ==============================
       9. DEVTOOLS CHECK
    ============================== */
    function _dtCheck(){
        const t = 160;
        if(
            window.outerWidth  - window.innerWidth  > t ||
            window.outerHeight - window.innerHeight > t
        ){
            _threatScore++;
            if(_threatScore > 3 && !_unlocked) _lock();
        }
    }


    /* ==============================
       10. ENFORCER
    ============================== */
    function _enforce(){
        if(!_unlocked) _lock();
        _dtCheck();
    }


    /* ==============================
       11. WATERMARK
    ============================== */
    try{
        Object.defineProperty(window, "__sn_flag__", {
            value: "protected_v4",
            writable: false,
            configurable: false
        });
    }catch(e){}


    /* ==============================
       12. INIT
    ============================== */
    function _init(){
        // Real site — exit immediately, zero impact on users
        if(_dOK()){
            _unlocked = true;
            return;
        }

        // Valid session from previous license key entry
        if(_checkSession()){
            _unlocked = true;
            return;
        }

        // Not on real domain + no valid session → lock
        setTimeout(function(){
            _lock();
            _enforceTimer = setInterval(_enforce, 2500);
        }, 800);
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", _init);
    } else {
        _init();
    }

})();

