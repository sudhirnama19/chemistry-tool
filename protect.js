
/* ==============================
   🔐 CHEM PROTECT v3 (FINAL)
   Stealth • Hardened • No Server
============================== */

(function(){

    /* ===== CONFIG ===== */
    const _D = "sudhirnama.in";     // your domain
    const _LS = "sn_lk";            // localStorage key

    let _U = false;                 // unlocked flag
    let _T = 0;                     // attempts counter


    /* ==============================
       1. DOMAIN CHECK
    ============================== */
    function _dOK(){
        try{
            return location.hostname.endsWith(_D);
        }catch(e){
            return false;
        }
    }


    /* ==============================
       2. HASH FUNCTION (STRONGER)
    ============================== */
    function _H(s){
        let h1 = 0xdeadbeef ^ s.length;
        let h2 = 0x41c6ce57 ^ s.length;

        for(let i=0;i<s.length;i++){
            let ch = s.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }

        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507);
        h2 = Math.imul(h2 ^ (h2>>>13), 3266489909);

        return (h2>>>0).toString(36) + (h1>>>0).toString(36);
    }


    /* ==============================
       3. REAL + DECOY KEYS
    ============================== */

    const _REAL = [
        _H("SN-29XK-8D2P"),
        _H("SN-AB12-X9Q7")
    ];

    const _DECOY = [
        _H("SN-XXXX-1111"),
        _H("SN-0000-TEST"),
        _H("SN-FAKE-9999"),
        _H("SN-AAAA-BBBB")
    ];


    /* ==============================
       4. VALIDATION
    ============================== */
    function _VK(k){

        const x = _H(k);

        if(_REAL.includes(x)) return true;

        // decoy path (misleading)
        if(_DECOY.includes(x)){
            _T += 2; // increase penalty
            return false;
        }

        _T++;
        return false;
    }


    /* ==============================
       5. STEALTH DISABLE
    ============================== */
    function _LOCK(){

        // disable UI
        document.querySelectorAll("button,input,select,textarea")
        .forEach(el=>{
            el.disabled = true;
            el.style.opacity = "0.5";
        });

        // corrupt calculation functions silently
        Object.keys(window).forEach(k=>{
            if(typeof window[k] === "function" &&
               /calc|compute|result|solve/i.test(k)){

                window[k] = function(){
                    return Math.random()*1000; // wrong result
                };
            }
        });

        // subtle notice
        if(!document.getElementById("sn_warn")){
            const d = document.createElement("div");
            d.id = "sn_warn";
            d.innerText = "⚠ Restricted";
            d.style.cssText =
              "position:fixed;bottom:10px;right:10px;background:#000;color:#fff;padding:4px 8px;font-size:11px;z-index:99999;opacity:0.7";
            document.body.appendChild(d);
        }
    }


    /* ==============================
       6. LICENSE FLOW
    ============================== */
    function _ASK(){

        // your domain → full access
        if(_dOK()){
            _U = true;
            return;
        }

        // already verified
        if(localStorage.getItem(_LS) === "1"){
            _U = true;
            return;
        }

        const k = prompt("Enter License Key:");

        if(!k){
            _LOCK();
            return;
        }

        setTimeout(()=>{

            if(!_VK(k)){
                _LOCK();
                return;
            }

            localStorage.setItem(_LS, "1");
            _U = true;

        }, 500 + Math.random()*500); // random delay
    }


    /* ==============================
       7. DEVTOOLS (LIGHT + SAFE)
    ============================== */
    function _DT(){

        const t = 170;

        if(
            window.outerWidth - window.innerWidth > t ||
            window.outerHeight - window.innerHeight > t
        ){
            _T++;
        }
    }


    /* ==============================
       8. ENFORCER LOOP
    ============================== */
    function _ENF(){

        if(!_U){
            _LOCK();
        }

        _DT();

        // too many attempts → permanent lock
        if(_T > 3){
            _LOCK();
        }
    }


    /* ==============================
       9. INVISIBLE WATERMARK
    ============================== */
    try{
        Object.defineProperty(window, "__sn_flag__", {
            value: "protected_v3",
            writable: false
        });
    }catch(e){}


    /* ==============================
       10. INIT
    ============================== */
    setTimeout(()=>{
        _ASK();
        setInterval(_ENF, 2500);
    }, 1200);


})();
