
/**
 * Chemistry Spark Lab - Dense Glass Universal Header (v4.0)
 * Includes all 30 calculators in a 3-column aesthetic grid.
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. FORCED CLEANUP
    const legacyHeaders = ['.main-header', '.top-header', 'header', '#header', '.universal-nav', '.spark-nav', '.ios-nav'];
    legacyHeaders.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
    });

    // 2. HEADER STRUCTURE (Complete Calculator Database)
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
                        <div class="drop-menu">
                            <div class="drop-grid">
                                <a href="ph-calculator.html">pH Calculator</a>
                                <a href="pka-pkb-calculator.html">pKa & pKb Solver</a>
                                <a href="buffer-calculator.html">Buffer pH Solver</a>
                                <a href="salt-hydrolysis.html">Salt Hydrolysis</a>
                                <a href="titration-simulator.html">Titration Simulator</a>
                                <a href="molarity-calculator.html">Molarity Solver</a>
                                <a href="molality-calculator.html">Molality Solver</a>
                                <a href="normality-calculator.html">Normality Solver</a>
                                <a href="stoichiometry-calculator.html">Stoichiometry Lab</a>
                                <a href="limiting-reagent-calculator.html">Limiting Reagent</a>
                                <a href="percent-yield-calculator.html">Percent Yield</a>
                                <a href="reaction-balancer.html">Reaction Balancer</a>
                                <a href="rate-calculator.html">Rate Kinetics</a>
                                <a href="thermodynamics-solver.html">Thermodynamics</a>
                                <a href="gibbs-energy-calculator.html">Gibbs Free Energy</a>
                                <a href="equilibrium-constant-calculator.html">Equilibrium (Kc)</a>
                                <a href="entropy-change.html">Entropy Change</a>
                                <a href="ionic-strength-calculator.html">Ionic Strength</a>
                                <a href="emf-calculator.html">EMF Calculator</a>
                                <a href="nernst-equation-calculator.html">Nernst Equation</a>
                                <a href="electrolysis-calculator.html">Electrolysis Lab</a>
                                <a href="oxidation-state-calculator.html">Oxidation State</a>
                                <a href="stereoisomers-calculator.html">Stereoisomers</a>
                                <a href="degree-of-unsaturation-calculator.html">Unsaturation (DU)</a>
                                <a href="beer-lambert-law-calculator.html">Beer-Lambert Law</a>
                                <a href="empirical-formula-calculator.html">Empirical Formula</a>
                                <a href="formula-weight-calculator.html">Formula Weight</a>
                                <a href="ppm-ppb-concentration-calculator.html">ppm / ppb Solver</a>
                                <a href="cfse-calculator.html">CFSE Calculator</a>
                                <a href="lattice-energy-calculator.html">Lattice Energy</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </div>
        </div>
    </nav>
    `;

    // 3. STYLING (Dense Glass, Square Shape, 3-Column Grid)
    const navStyles = `
    <style>
        :root {
            --nav-accent: #00f2ff;
            --dense-glass: rgba(10, 15, 28, 0.94);
            --glass-blur: blur(40px) saturate(200%);
            --glass-border: rgba(255, 255, 255, 0.12);
            --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        body { padding-top: 85px !important; }

        .spark-nav {
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%);
            width: 95%; max-width: 1200px; height: 60px;
            z-index: 10000; display: flex; align-items: center;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: var(--dense-glass);
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            box-shadow: 0 15px 35px rgba(0,0,0,0.5);
            transition: var(--transition);
        }

        .nav-container {
            width: 100%; display: flex; justify-content: space-between;
            align-items: center; padding: 0 20px;
        }

        .nav-brand {
            text-decoration: none; font-weight: 800; font-size: 1.3rem;
            letter-spacing: 1px;
        }
        .brand-spark { color: var(--nav-accent); }
        .brand-lab { color: #ffffff; margin-left: 4px; }

        .nav-menu { display: flex; gap: 15px; align-items: center; }

        .nav-link, .drop-trigger {
            color: #fff; text-decoration: none;
            font-size: 1rem; font-weight: 700; background: none;
            border: none; padding: 10px 15px; border-radius: 8px;
            cursor: pointer; transition: var(--transition);
        }

        .nav-link:hover, .drop-trigger:hover { color: var(--nav-accent); background: rgba(255, 255, 255, 0.05); }

        /* DROPDOWN - Square Dense Glass */
        .nav-dropdown { position: relative; }
        .drop-menu {
            position: absolute; top: calc(100% + 15px); right: 0;
            background: var(--dense-glass);
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            width: 750px; border-radius: 15px;
            border: 1px solid var(--glass-border);
            padding: 20px; opacity: 0; visibility: hidden;
            transform: translateY(15px); transition: var(--transition);
            box-shadow: 0 25px 60px rgba(0,0,0,0.7);
        }
        
        /* 3-Column Aesthetic Grid */
        .drop-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 8px; 
            max-height: 70vh;
            overflow-y: auto;
            padding-right: 5px;
        }

        /* Custom Scrollbar for Grid */
        .drop-grid::-webkit-scrollbar { width: 5px; }
        .drop-grid::-webkit-scrollbar-thumb { background: var(--nav-accent); border-radius: 10px; }

        .nav-dropdown:hover .drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        .nav-dropdown:hover .chevron { transform: rotate(180deg); }

        .drop-menu a {
            color: rgba(255,255,255,0.85); padding: 10px 12px;
            text-decoration: none; display: block; font-size: 0.82rem;
            font-weight: 600; border-radius: 8px; transition: 0.2s;
            background: rgba(255,255,255,0.03);
            border: 1px solid transparent;
        }
        .drop-menu a:hover { 
            background: rgba(0, 242, 255, 0.1); 
            color: var(--nav-accent); 
            border-color: rgba(0, 242, 255, 0.3);
            transform: scale(1.02);
        }

        .chevron {
            display: inline-block; width: 7px; height: 7px;
            border-right: 2px solid currentColor; border-bottom: 2px solid currentColor;
            transform: rotate(45deg); margin-left: 8px; transition: var(--transition);
        }

        /* MOBILE MENU - Vertical Expansion */
        .mobile-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; }
        .bar { width: 22px; height: 2px; background: var(--nav-accent); transition: var(--transition); }

        @media (max-width: 850px) {
            .drop-menu { width: 500px; }
            .drop-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
            .mobile-toggle { display: flex; }
            .nav-menu {
                position: absolute; top: 75px; left: 0; width: 100%;
                background: var(--dense-glass);
                backdrop-filter: var(--glass-blur);
                -webkit-backdrop-filter: var(--glass-blur);
                flex-direction: column; padding: 20px;
                border-radius: 15px; border: 1px solid var(--glass-border);
                transform: translateY(-10px); opacity: 0; visibility: hidden;
                transition: var(--transition);
                max-height: 85vh; overflow-y: auto;
            }
            .nav-menu.active { transform: translateY(0); opacity: 1; visibility: visible; }
            .nav-dropdown { width: 100%; }
            .drop-menu { 
                position: static; width: 100%; opacity: 1; visibility: visible; 
                transform: none; display: none; background: transparent; border: none; box-shadow: none; margin-top: 10px;
            }
            .nav-dropdown.active .drop-menu { display: block; }
            .drop-grid { grid-template-columns: 1fr; max-height: none; }
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

    mobileToggle.addEventListener('click', () => {
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
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownWrapper.classList.toggle('active');
        }
    });
});
