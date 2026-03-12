
/**
 * Chemistry Spark Lab - Universal Header (v6.0)
 * COMPLETE EDITION: Includes SmartParser Integration, 
 * Legacy Removal, Scroll-Bleed Fix, and Smooth Animations.
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. LEGACY CLEANUP - Wipes out old headers/navbars from existing HTML files
    const legacySelectors = ['.navbar', '.main-header', '.top-header', 'header', '#header', '.universal-nav'];
    legacySelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none'; // Instant hide
            el.remove();               // Permanent delete
        });
    });

    // 2. THE HEADER HTML STRUCTURE
    const headerHTML = `
    <nav class="spark-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-brand">
                <span class="brand-spark">Chemistry</span><span class="brand-lab">Calculators</span>
            </a>
            
            <div class="nav-actions">
                <div class="nav-menu" id="navMenu">
                    <a href="index.html" class="nav-link">Home</a>
                    
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

    // 3. FULL CSS STYLING
    const navStyles = `
    <style>
        :root {
            --nav-accent: #00f2ff;
            --dense-glass: rgba(10, 15, 28, 1);
            --glass-blur: blur(60px) saturate(210%);
            --glass-border: rgba(255, 255, 255, 0.15);
        }

        /* FIX HORIZONTAL OVERFLOW & ALIGNMENT */
        html, body { 
            overflow-x: hidden !important; 
            width: 100% !important; 
            margin: 0; 
            padding: 0; 
            background-color: #0a1120 !important; 
        }

        /* AUTO-HIDE OLD ELEMENTS - REINFORCEMENT */
        .navbar, .main-header, #header { display: none !important; visibility: hidden !important; }

        /* SCROLL PROTECTION BARRIER (Hides text bleeding behind header) */
        body { padding-top: 100px !important; }
        .header-barrier {
            position: fixed; top: 0; left: 0; width: 100%; height: 95px;
            background: #0a1120; z-index: 999997; pointer-events: none;
        }

        /* MAIN NAV DESIGN */
        .spark-nav {
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%);
            width: 95%; max-width: 1200px; height: 62px; 
            z-index: 999999 !important;
            display: flex; align-items: center; border-radius: 14px;
            border: 1px solid var(--glass-border); 
            background: var(--dense-glass);
            backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
            box-shadow: 0 15px 40px rgba(0,0,0,0.6);
            opacity: 0; animation: navEntrance 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes navEntrance {
            from { opacity: 0; transform: translate(-50%, -25px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }

        .nav-container { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 25px; }
        .nav-brand { text-decoration: none; font-weight: 900; font-size: 1.45rem; letter-spacing: 0.5px; white-space: nowrap; cursor: pointer; }
        .brand-spark { color: var(--nav-accent); }
        .brand-lab { color: #ffffff; margin-left: 4px; }

        /* NAV MENU LINKS */
        .nav-menu { display: flex; gap: 12px; align-items: center; }
        .nav-link, .drop-trigger {
            color: #fff; text-decoration: none; font-size: 0.98rem; font-weight: 700;
            background: none; border: none; padding: 10px 16px; border-radius: 9px;
            cursor: pointer; transition: 0.3s all ease;
        }
        .nav-link:hover, .drop-trigger:hover { background: rgba(255, 255, 255, 0.08); color: var(--nav-accent); }

        /* DESKTOP DROPDOWN */
        .nav-dropdown { position: relative; }
        .drop-menu {
            position: absolute; top: calc(100% + 15px); right: 0;
            background: var(--dense-glass); border-radius: 18px;
            border: 1px solid var(--glass-border); padding: 22px; width: 780px;
            opacity: 0; visibility: hidden; transform: translateY(15px);
            transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 30px 70px rgba(0,0,0,0.8);
            backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
            z-index: 1000000;
        }
        .nav-dropdown.active .drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }

        .drop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .drop-menu a {
            color: rgba(255,255,255,0.85); padding: 12px; text-decoration: none;
            font-size: 0.85rem; font-weight: 600; border-radius: 10px;
            background: rgba(255,255,255,0.03); border: 1px solid transparent;
            transition: 0.2s ease;
        }
        .drop-menu a:hover { background: var(--nav-accent); color: #000; border-color: var(--nav-accent); transform: translateY(-2px); }

        .chevron { display: inline-block; width: 7px; height: 7px; border-right: 2.5px solid #fff; border-bottom: 2.5px solid #fff; transform: rotate(45deg); margin-left: 10px; transition: 0.3s; vertical-align: middle; }
        .nav-dropdown.active .chevron { transform: rotate(225deg); color: var(--nav-accent); border-color: var(--nav-accent); }

        /* MOBILE MENU & HAMBURGER */
        .mobile-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; padding: 10px; z-index: 1000002; }
        .bar { width: 24px; height: 2px; background: var(--nav-accent); transition: 0.3s; border-radius: 2px; }

        @media (max-width: 900px) {
            .mobile-toggle { display: flex; }
            .nav-menu {
                position: absolute; top: 75px; left: 0; width: 100%;
                background: var(--dense-glass); backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
                flex-direction: column; padding: 15px; 
                gap: 5px; /* TIGHT MOBILE SPACING */
                border-radius: 16px; border: 1px solid var(--glass-border);
                transform: translateY(-15px); opacity: 0; visibility: hidden; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.7);
            }
            .nav-menu.active { opacity: 1; visibility: visible; transform: translateY(0); }
            .nav-link, .drop-trigger { width: 100%; text-align: left; padding: 14px; font-size: 1.1rem; }
            .nav-dropdown { width: 100%; }
            .drop-menu { 
                position: static; width: 100%; opacity: 1; visibility: visible; 
                display: none; transform: none; background: transparent; border: none; box-shadow: none; padding: 0 10px 10px 10px;
            }
            .nav-dropdown.active .drop-menu { display: block; }
            .drop-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
            .drop-menu a { font-size: 0.9rem; padding: 12px; }
        }
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

    // Mobile Toggle Handler
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

    // Dropdown Toggle Handler
    dropTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownWrapper.classList.toggle('active');
    });

    // Close on Outside Click
    document.addEventListener('click', (e) => {
        if (!dropdownWrapper.contains(e.target)) {
            dropdownWrapper.classList.remove('active');
        }
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = ""; bars[1].style.opacity = "1"; bars[2].style.transform = "";
        }
    });
});
