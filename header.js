
/**
 * Chemistry Spark Lab - Universal Header (v6.1)
 * FIXED: Horizontal shifting, mobile layout overflow, and scroll-bleed.
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. LEGACY CLEANUP - Targeting the specific '.navbar' in your HTML
    const legacySelectors = ['.navbar', '.main-header', '.top-header', 'header', '#header'];
    legacySelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none'; 
            el.remove();               
        });
    });

    // 2. THE HEADER HTML
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

    // 3. FULL FIXED CSS
    const navStyles = `
    <style>
        :root {
            --nav-accent: #00f2ff;
            --dense-bg: #0f172a;
            --glass-border: rgba(255, 255, 255, 0.1);
        }

        /* LOCK SCROLLING & FIX OVERFLOW */
        html, body { 
            overflow-x: hidden !important; 
            width: 100% !important; 
            margin: 0; 
            padding: 0;
        }

        /* HIDE OLD NAVBAR PERMANENTLY */
        .navbar { display: none !important; }

        /* HEADER BARRIER (Solid background to stop text bleeding) */
        body { padding-top: 80px !important; }
        .header-barrier {
            position: fixed; top: 0; left: 0; width: 100%; height: 75px;
            background: #0a1120; z-index: 999997; pointer-events: none;
        }

        /* MAIN NAV DESIGN - LOCKED TO TOP (Fixes shifting) */
        .spark-nav {
            position: fixed; top: 0; left: 0;
            width: 100%; height: 70px; 
            z-index: 999999 !important;
            display: flex; align-items: center;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--glass-border);
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            box-sizing: border-box;
        }

        .nav-container { 
            width: 100%; 
            max-width: 1200px; 
            margin: 0 auto;
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 0 20px;
            box-sizing: border-box;
        }

        .nav-brand { text-decoration: none; font-weight: 800; font-size: 1.3rem; white-space: nowrap; }
        .brand-spark { color: var(--nav-accent); }
        .brand-lab { color: #ffffff; margin-left: 4px; }

        /* NAV MENU */
        .nav-menu { display: flex; gap: 5px; align-items: center; }
        .nav-link, .drop-trigger {
            color: #fff; text-decoration: none; font-size: 0.95rem; font-weight: 700;
            background: none; border: none; padding: 10px 15px; border-radius: 8px;
            cursor: pointer; transition: 0.2s;
        }
        .nav-link:hover, .drop-trigger:hover { background: rgba(255,255,255,0.1); }

        /* DROPDOWN - FULL SIZE DESKTOP */
        .nav-dropdown { position: relative; }
        .drop-menu {
            position: absolute; top: 60px; right: 0;
            background: #1e293b; border-radius: 12px;
            border: 1px solid var(--glass-border); padding: 20px; width: 700px;
            opacity: 0; visibility: hidden; transform: translateY(10px);
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .nav-dropdown.active .drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }

        .drop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .drop-menu a {
            color: #cbd5e1; padding: 10px; text-decoration: none; font-size: 0.8rem;
            border-radius: 8px; background: rgba(255,255,255,0.03); transition: 0.2s;
        }
        .drop-menu a:hover { background: var(--nav-accent); color: #0f172a; }

        .chevron { display: inline-block; width: 6px; height: 6px; border-right: 2px solid #fff; border-bottom: 2px solid #fff; transform: rotate(45deg); margin-left: 8px; transition: 0.3s; vertical-align: middle; }
        .nav-dropdown.active .chevron { transform: rotate(225deg); }

        /* MOBILE OPTIMIZATION (Fixes Horizontal Shifting) */
        .mobile-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; padding: 5px; }
        .bar { width: 22px; height: 2px; background: var(--nav-accent); transition: 0.3s; }

        @media (max-width: 850px) {
            .mobile-toggle { display: flex; }
            .nav-menu {
                position: absolute; top: 70px; left: 0; width: 100%;
                background: #0f172a; flex-direction: column; 
                padding: 10px 0; gap: 0; border-bottom: 1px solid var(--glass-border);
                transform: translateY(-10px); opacity: 0; visibility: hidden; transition: 0.3s;
                max-height: 80vh; overflow-y: auto;
            }
            .nav-menu.active { opacity: 1; visibility: visible; transform: translateY(0); }
            .nav-link, .drop-trigger { width: 100%; text-align: left; padding: 15px 25px; border-radius: 0; }
            .drop-menu { 
                position: static; width: 100%; opacity: 1; visibility: visible; 
                display: none; background: #1e293b; border: none; box-shadow: none; padding: 10px 20px;
                box-sizing: border-box;
            }
            .nav-dropdown.active .drop-menu { display: block; }
            .drop-grid { grid-template-columns: 1fr 1fr; }
        }
    </style>
    `;

    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 4. INTERACTIVE LOGIC
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropTrigger = document.getElementById('dropTrigger');
    const dropdownWrapper = document.getElementById('dropdownWrapper');

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        mobileToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
        if(navMenu.classList.contains('active')) {
            mobileToggle.style.color = "var(--nav-accent)";
            mobileToggle.style.fontSize = "24px";
            mobileToggle.style.fontWeight = "bold";
        } else {
            mobileToggle.style.fontSize = "inherit";
        }
    });

    dropTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownWrapper.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        dropdownWrapper.classList.remove('active');
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    });
});
