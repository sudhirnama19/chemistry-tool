
/**
 * Chemistry Spark Lab - Universal Header (v6.6)
 * FULL LOADED VERSION - All Calculators Included
 * FIX: Increased gap between mobile tabs to prevent touching [cite: 2026-03-12].
 * FIX: Resized font and padding for perfect mobile fit [cite: 2026-03-12].
 * FIX: High z-index to prevent overlapping with calculator cards [cite: 2026-03-12].
 */
document.addEventListener("DOMContentLoaded", function() {

    // 1. LEGACY CLEANUP
    const legacySelectors = ['.navbar', '.main-header', '.top-header', 'header', '#header', '.universal-nav'];
    legacySelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none';
            el.remove();
        });
    });

    // 2. THE HEADER HTML STRUCTURE (FULL CONTENT)
    const headerHTML = `
    <nav class="spark-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-brand">
                <span class="brand-spark">Chemistry</span><span class="brand-lab">Calculators</span>
            </a>
            
            <div class="nav-actions">
                <div class="nav-menu" id="navMenu">
                    <a href="index.html" class="nav-link home-link">Home</a>
                    
                    <div class="nav-dropdown" id="dropdownWrapper">
                        <button class="drop-trigger" id="dropTrigger">
                            Calculators <span class="chevron"></span>
                        </button>
                        <div class="drop-menu" id="dropMenu">
                            <div class="drop-grid">
                                <a href="ph-calculator.html">pH Calculator</a>
                                <a href="pka-pkb-calculator.html">pKa & pKb</a>
                                <a href="buffer-calculator.html">Buffer Solver</a>
                                <a href="salt-hydrolysis.html">Salt Hydrolysis</a>
                                <a href="titration-simulator.html">Titration</a>
                                <a href="molarity-calculator.html">Molarity</a>
                                <a href="molality-calculator.html">Molality</a>
                                <a href="normality-calculator.html">Normality</a>
                                <a href="stoichiometry-calculator.html">Stoichiometry</a>
                                <a href="limiting-reagent-calculator.html">Limiting Reagent</a>
                                <a href="percent-yield-calculator.html">Percent Yield</a>
                                <a href="reaction-balancer.html">Balancer</a>
                                <a href="rate-calculator.html">Rate Kinetics</a>
                                <a href="thermodynamics-solver.html">Thermodynamics</a>
                                <a href="gibbs-energy-calculator.html">Gibbs Energy</a>
                                <a href="equilibrium-constant-calculator.html">Equilibrium</a>
                                <a href="entropy-change.html">Entropy</a>
                                <a href="ionic-strength-calculator.html">Ionic Strength</a>
                                <a href="emf-calculator.html">EMF Solver</a>
                                <a href="nernst-equation-calculator.html">Nernst Eq</a>
                                <a href="electrolysis-calculator.html">Electrolysis</a>
                                <a href="oxidation-state-calculator.html">Oxidation</a>
                                <a href="stereoisomers-calculator.html">Stereoisomers</a>
                                <a href="degree-of-unsaturation-calculator.html">Unsaturation</a>
                                <a href="beer-lambert-law-calculator.html">Beer-Lambert</a>
                                <a href="empirical-formula-calculator.html">Empirical</a>
                                <a href="formula-weight-calculator.html">Formula Wt</a>
                                <a href="ppm-ppb-concentration-calculator.html">ppm / ppb</a>
                                <a href="cfse-calculator.html">CFSE Solver</a>
                                <a href="lattice-energy-calculator.html">Lattice Energy</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="mobile-toggle" id="mobileToggle">
                    <span class="bar"></span><span class="bar"></span><span class="bar"></span>
                </button>
            </div>
        </div>
    </nav>
    <div class="header-barrier"></div>
    `;

    // 3. FULL CSS STYLING WITH SPACING FIXES [cite: 2026-03-12]
    const navStyles = `
    <style>
        :root {
            --nav-accent: #00f2ff;
            --dense-glass: rgba(10, 15, 28, 1);
            --glass-blur: blur(50px) saturate(210%);
            --glass-border: rgba(255, 255, 255, 0.15);
            --universal-bg: #0a1120; 
        }

        html, body { 
            background-color: var(--universal-bg) !important; 
            background-image: none !important;
            background: var(--universal-bg) !important; 
            overflow-x: hidden !important; 
            margin: 0; padding: 0; 
        }

        .spark-nav, .spark-nav * { box-sizing: border-box !important; }
        body { padding-top: 100px !important; }

        .header-barrier {
            position: fixed; top: 0; left: 0; width: 100%; height: 95px;
            background: var(--universal-bg); z-index: 999997; pointer-events: none;
        }

        .spark-nav {
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%);
            width: 92%; max-width: 1200px; height: 62px; 
            z-index: 999999 !important;
            display: flex; align-items: center; border-radius: 14px;
            border: 1px solid var(--glass-border); 
            background: var(--dense-glass);
            backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
            box-shadow: 0 15px 40px rgba(0,0,0,0.6);
        }

        .nav-container { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
        .nav-brand { text-decoration: none; font-weight: 900; font-size: 1.25rem; white-space: nowrap; color: #fff; }
        .brand-spark { color: var(--nav-accent); }
        .brand-lab { color: #ffffff; margin-left: 4px; }

        .nav-menu { display: flex; gap: 8px; align-items: center; }
        .nav-link, .drop-trigger {
            color: #fff; text-decoration: none; font-size: 0.95rem; font-weight: 700;
            background: none; border: none; padding: 8px 14px; border-radius: 9px;
            cursor: pointer; transition: 0.3s;
        }

        /* DESKTOP DROPDOWN */
        .nav-dropdown { position: relative; }
        .drop-menu {
            position: absolute; top: calc(100% + 15px); right: 0;
            background: var(--dense-glass); border-radius: 18px;
            border: 1px solid var(--glass-border); padding: 22px; width: 780px;
            opacity: 0; visibility: hidden; transform: translateY(15px);
            transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 30px 70px rgba(0,0,0,0.8);
            z-index: 1000000;
        }
        .nav-dropdown.active .drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        .drop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .drop-grid a { 
            color: rgba(255,255,255,0.85); padding: 12px; text-decoration: none;
            font-size: 0.85rem; font-weight: 600; border-radius: 10px;
            background: rgba(255,255,255,0.03); transition: 0.2s;
        }
        .drop-grid a:hover { background: var(--nav-accent); color: #000; }

        /* 1. Reset standard state to ensure text is always white by default */
.drop-grid a {
    color: rgba(255, 255, 255, 0.85) !important;
    transition: background 0.2s, color 0.2s;
}

/* 2. Glow and Dark text ONLY while the finger/mouse is pressing down */
.drop-grid a:active {
    background: var(--nav-accent) !important; 
    color: #000 !important; 
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5) !important;
    transform: scale(0.96);
    transition: 0s; /* Makes the change instant when touching */
}

/* 3. Force text back to white immediately after the click/touch ends */
.drop-grid a:focus, 
.drop-grid a:visited {
    color: rgba(255, 255, 255, 0.85) !important;
    background: rgba(255, 255, 255, 0.08) !important; /* Reverts to original subtle glass */
}

        .mobile-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; }
        .bar { width: 24px; height: 2px; background: var(--nav-accent); border-radius: 2px; transition: 0.3s; }

        /* MOBILE FIXES [cite: 2026-03-12] */
        @media (max-width: 900px) {
            .mobile-toggle { display: flex; z-index: 1000002; }
            .nav-menu {
                position: absolute; top: 70px; left: 0; width: 100%;
                background: var(--dense-glass); backdrop-filter: var(--glass-blur);
                flex-direction: column; padding: 20px 15px; gap: 10px;
                border-radius: 16px; border: 1px solid var(--glass-border);
                transform: translateY(-15px); opacity: 0; visibility: hidden; transition: 0.4s ease;
                max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 80px rgba(0,0,0,0.9);
                z-index: 1000005 !important;
            }
            .nav-menu.active { opacity: 1; visibility: visible; transform: translateY(0); }
            
            .home-link { margin-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px !important; }
            .nav-link, .drop-trigger { width: 100%; text-align: left; padding: 14px; font-size: 1.1rem; }
            
            .nav-dropdown { position: static !important; width: 100%; }
            .drop-menu { 
                position: static; width: 100%; opacity: 1; visibility: visible; 
                display: none; transform: none; background: transparent; border: none; box-shadow: none; padding: 10px 0;
            }
            .nav-dropdown.active .drop-menu { display: block; }

            /* TAB RESIZING & SPACING [cite: 2026-03-12] */
            .drop-grid { grid-template-columns: 1fr 1fr; gap: 14px !important; }
            .drop-grid a { 
                font-size: 0.82rem !important; 
                padding: 12px 8px !important; 
                background: rgba(255,255,255,0.08) !important;
                text-align: center;
                min-height: 48px;
                display: flex; align-items: center; justify-content: center;
            }
        }
        .chevron { display: inline-block; width: 7px; height: 7px; border-right: 2.5px solid #fff; border-bottom: 2.5px solid #fff; transform: rotate(45deg); margin-left: 10px; transition: 0.3s; vertical-align: middle; }
        .nav-dropdown.active .chevron { transform: rotate(225deg); color: var(--nav-accent); border-color: var(--nav-accent); }
    </style>
    `;

    // 4. INJECTION
    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 5. INTERACTIVITY LOGIC
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropTrigger = document.getElementById('dropTrigger');
    const dropdownWrapper = document.getElementById('dropdownWrapper');

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        const bars = mobileToggle.querySelectorAll('.bar');
        if(navMenu.classList.contains('active')) {
            bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            bars[0].style.transform = ""; bars[1].style.opacity = "1"; bars[2].style.transform = "";
        }
    });

    dropTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownWrapper.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownWrapper.contains(e.target)) dropdownWrapper.classList.remove('active');
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = ""; bars[1].style.opacity = "1"; bars[2].style.transform = "";
        }
    });



    /* 🔥 SAFE CORE LOADER (NO BREAK) */

(function(){
    if(window.__chem_core_loaded) return; // prevent duplicate loading
    window.__chem_core_loaded = true;

    var script = document.createElement("script");
    script.src = "https://chemistrytools.sudhirnama.in/js/chemistry-core.js";
    script.defer = true;
    document.head.appendChild(script);
})();






/* ==============================
   🔒 STABLE PROTECTION CORE (SAFE)
============================== */

(function(){

    const DOMAIN = "sudhirnama.in";
    const SELF_NAME = "header.js";

    let tampered = false;
    let initialized = false;

    /* ==============================
       1. DOMAIN LOCK (SAFE)
    ============================== */
    try{
        if(DOMAIN && !location.hostname.endsWith(DOMAIN)){
            document.documentElement.innerHTML =
              "<h2 style='text-align:center;margin-top:50px;'>Unauthorized Copy</h2>";
            return;
        }
    }catch(e){}


    /* ==============================
       2. DELAY INIT (IMPORTANT)
    ============================== */
    setTimeout(() => {
        initialized = true;
    }, 2000);


    /* ==============================
       3. SCRIPT CHECK (SAFE)
    ============================== */
    function checkScript(){
        if(!initialized) return;

        let found = false;
        document.querySelectorAll("script[src]").forEach(s => {
            if(s.src.includes(SELF_NAME)) found = true;
        });

        if(!found){
            tampered = true;
        }
    }


    /* ==============================
       4. DEVTOOLS DETECTION (SAFE)
    ============================== */
    function detectDevTools(){
        if(!initialized) return;

        const threshold = 160;

        if(
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
        ){
            tampered = true;
        }
    }


    /* ==============================
       5. FEATURE LOCK (ONLY WHEN REAL)
    ============================== */
    function lockApp(){
        document.body.innerHTML = `
            <div style="text-align:center;margin-top:60px;font-family:sans-serif;">
                <h2>Security Violation Detected</h2>
                <p>Application disabled</p>
            </div>
        `;
    }


    /* ==============================
       6. PROTECTION LOOP (CONTROLLED)
    ============================== */
    function protect(){
        checkScript();
        detectDevTools();

        if(tampered){
            lockApp();
        }
    }

    setInterval(protect, 2000);


})();


    
    
});




