
/**
 * Chemistry Spark Lab - Universal Header (v5.1)
 * FIX: Dense Frost Blur for Dropdown, Mobile 2-column grid, Click-away listener.
 */

document.addEventListener("DOMContentLoaded", function() {
    const legacyHeaders = ['.main-header', '.top-header', 'header', '#header', '.universal-nav', '.spark-nav', '.ios-nav'];
    legacyHeaders.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
    });

    const headerHTML = `
    <nav class="spark-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-brand">
                <span class="brand-spark">CHEMISTRY</span><span class="brand-lab">LAB</span>
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
    `;

    const navStyles = `
    <style>
        :root {
            --nav-accent: #00f2ff;
            --dense-glass: rgba(10, 15, 28, 0.99); /* Increased Opacity */
            --glass-blur: blur(70px) saturate(250%); /* Stronger Blur */
            --glass-border: rgba(255, 255, 255, 0.15);
        }

        body { padding-top: 85px !important; }

        .spark-nav {
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%);
            width: 95%; max-width: 1200px; height: 60px; z-index: 10000;
            display: flex; align-items: center; border-radius: 12px;
            border: 1px solid var(--glass-border); background: var(--dense-glass);
            backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
            box-shadow: 0 15px 35px rgba(0,0,0,0.5);
        }

        .nav-container { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
        .nav-brand { text-decoration: none; font-weight: 800; font-size: 1.3rem; letter-spacing: 1px; }
        .brand-spark { color: var(--nav-accent); }
        .brand-lab { color: #ffffff; margin-left: 4px; }
        .nav-menu { display: flex; gap: 15px; align-items: center; }

        .nav-link, .drop-trigger {
            color: #fff; text-decoration: none; font-size: 1rem; font-weight: 700;
            background: none; border: none; padding: 10px 15px; border-radius: 8px;
            cursor: pointer; transition: 0.3s;
        }

        /* DESKTOP DROPDOWN - FIXED BLUR */
        .nav-dropdown { position: relative; }
        .drop-menu {
            position: absolute; top: calc(100% + 15px); right: 0;
            background: var(--dense-glass); 
            border-radius: 15px;
            border: 1px solid var(--glass-border); 
            padding: 20px; 
            width: 750px;
            opacity: 0; visibility: hidden; transform: translateY(15px);
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 25px 60px rgba(0,0,0,0.8);
            /* Force Blur on the dropdown itself */
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            z-index: 10001;
        }
        
        .nav-dropdown.active .drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        .nav-dropdown.active .chevron { transform: rotate(180deg); }

        .drop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .drop-menu a {
            color: rgba(255,255,255,0.9); padding: 10px; text-decoration: none;
            font-size: 0.82rem; font-weight: 600; border-radius: 8px;
            background: rgba(255,255,255,0.05); transition: 0.2s;
        }
        .drop-menu a:hover { background: var(--nav-accent); color: #000; }

        .chevron { display: inline-block; width: 7px; height: 7px; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; transform: rotate(45deg); margin-left: 8px; transition: 0.3s; }

        /* MOBILE STYLES */
        .mobile-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; }
        .bar { width: 22px; height: 2px; background: var(--nav-accent); transition: 0.3s; }

        @media (max-width: 768px) {
            .mobile-toggle { display: flex; }
            .nav-menu {
                position: absolute; top: 75px; left: 0; width: 100%;
                background: var(--dense-glass); 
                backdrop-filter: var(--glass-blur);
                -webkit-backdrop-filter: var(--glass-blur);
                flex-direction: column; padding: 20px;
                border-radius: 15px; border: 1px solid var(--glass-border);
                transform: translateY(-10px); opacity: 0; visibility: hidden; transition: 0.4s;
                max-height: 80vh; overflow-y: auto;
            }
            .nav-menu.active { opacity: 1; visibility: visible; transform: translateY(0); }
            .nav-dropdown { width: 100%; }
            .drop-menu { 
                position: static; width: 100%; opacity: 1; visibility: visible; 
                display: none; transform: none; background: transparent; border: none; box-shadow: none;
                backdrop-filter: none; /* Disable nested blur on mobile to avoid lag */
            }
            .nav-dropdown.active .drop-menu { display: block; }
            .drop-grid { grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px 0; }
        }
    </style>
    `;

    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

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
