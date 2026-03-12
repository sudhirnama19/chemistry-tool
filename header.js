
/**
 * Chemistry Spark Lab - Universal Header (v6.5)
 * FIXED: Mobile menu now pushes content down instead of overlapping.
 * FIXED: Background color sync across all pages.
 */
document.addEventListener("DOMContentLoaded", function() {

    // 1. LEGACY CLEANUP
    const legacySelectors = ['.navbar', '.main-header', '.top-header', 'header', '#header', '.universal-nav'];
    legacySelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => { el.style.display = 'none'; el.remove(); });
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
            --glass-blur: blur(40px) saturate(180%);
            --glass-border: rgba(255, 255, 255, 0.15);
            --universal-bg: #0a1120;
        }

        /* SYNC BACKGROUNDS AND REMOVE GRADIENTS */
        html, body { 
            background-color: var(--universal-bg) !important; 
            background-image: none !important; 
            background: var(--universal-bg) !important;
        }

        .spark-nav, .spark-nav * { box-sizing: border-box !important; }
        .navbar, .main-header, #header { display: none !important; }

        body { padding-top: 100px !important; }

        .header-barrier {
            position: fixed; top: 0; left: 0; width: 100%; height: 95px;
            background: var(--universal-bg); z-index: 999997; pointer-events: none;
        }

        /* THE FLOATING CAPSULE */
        .spark-nav {
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%);
            width: 92%; max-width: 1200px; min-height: 62px;
            z-index: 999999 !important;
            background: var(--dense-glass);
            backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border); border-radius: 14px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.6);
            transition: height 0.3s ease;
        }

        .nav-container { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; }
        .nav-brand { text-decoration: none; font-weight: 900; font-size: 1.2rem; cursor: pointer; flex-shrink: 0; }
        .brand-spark { color: var(--nav-accent); }
        .brand-lab { color: #ffffff; margin-left: 4px; }

        .nav-menu { display: flex; gap: 8px; align-items: center; }
        .nav-link, .drop-trigger {
            color: #fff; text-decoration: none; font-size: 0.95rem; font-weight: 700;
            background: none; border: none; padding: 8px 14px; border-radius: 8px;
            cursor: pointer; transition: 0.3s;
        }

        /* DESKTOP DROPDOWN */
        .nav-dropdown { position: relative; }
        .drop-menu {
            position: absolute; top: calc(100% + 15px); right: 0;
            background: var(--dense-glass); border-radius: 18px;
            border: 1px solid var(--glass-border); padding: 20px; width: 700px;
            opacity: 0; visibility: hidden; transform: translateY(15px);
            transition: 0.3s ease; z-index: 1000000;
        }
        .nav-dropdown.active .drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        .drop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .drop-grid a { color: #fff; text-decoration: none; font-size: 0.85rem; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.05); }
        .drop-grid a:hover { background: var(--nav-accent); color: #000; }

        .mobile-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; }
        .bar { width: 22px; height: 2px; background: var(--nav-accent); border-radius: 2px; }

        /* MOBILE FIXES */
        @media (max-width: 900px) {
            .mobile-toggle { display: flex; }
            
            /* The Menu now pushes the Capsule down */
            .nav-container { flex-wrap: wrap; }
            
            .nav-menu {
                display: none; width: 100%; flex-direction: column; 
                padding: 20px 0 10px 0; border-top: 1px solid rgba(255,255,255,0.1);
                margin-top: 10px;
            }
            .nav-menu.active { display: flex; }

            .nav-link, .drop-trigger { width: 100%; padding: 12px; }

            .drop-menu { 
                position: static !important; width: 100% !important; 
                display: none; opacity: 1; visibility: visible; 
                transform: none; background: transparent; border: none; padding: 10px;
            }
            .nav-dropdown.active .drop-menu { display: block; }
            .drop-grid { grid-template-columns: 1fr 1fr; }
            
            /* Make sure calculator content stays below the floating header */
            .container-narrow, .container { position: relative; z-index: 1 !important; }
        }
    </style>
    `;

    // 4. INJECTION
    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 5. INTERACTIVITY
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropTrigger = document.getElementById('dropTrigger');
    const dropdownWrapper = document.getElementById('dropdownWrapper');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    dropTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownWrapper.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownWrapper.contains(e.target)) dropdownWrapper.classList.remove('active');
    });
});
