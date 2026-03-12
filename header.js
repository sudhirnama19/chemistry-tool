
/**
 * Chemistry Spark Lab - Dense Glass Universal Header
 * Square card design, High-density blur, 3-Column Grid
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. CLEANUP
    const legacyHeaders = ['.main-header', '.top-header', 'header', '#header', '.universal-nav', '.spark-nav', '.ios-nav'];
    legacyHeaders.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
    });

    // 2. HEADER STRUCTURE
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
                                <a href="poh-calculator.html">pOH Solver</a>
                                <a href="buffer-calculator.html">Buffer Lab</a>
                                <a href="molarity-calculator.html">Molarity</a>
                                <a href="molality-calculator.html">Molality</a>
                                <a href="normality-calculator.html">Normality</a>
                                <a href="titration-calculator.html">Titration</a>
                                <a href="entropy-change.html">Entropy</a>
                                <a href="gibbs-energy.html">Gibbs Energy</a>
                                <a href="equilibrium-constant-calculator.html">Equilibrium</a>
                                <a href="ionic-strength-calculator.html">Ionic Strength</a>
                                <a href="kinetics-calculator.html">Kinetics</a>
                                <a href="stereoisomers-calculator.html">Isomers</a>
                                <a href="electrolysis-calculator.html">Electrolysis</a>
                                <a href="emf-calculator.html">EMF Nernst</a>
                                <a href="percent-yield-calculator.html">Yield %</a>
                                <a href="pka-pkb-calculator.html">pKa/pKb</a>
                                <a href="stoichiometry-calculator.html">Stoichiometry</a>
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

    // 3. STYLING (Dense Glass & Square Design)
    const navStyles = `
    <style>
        :root {
            --nav-accent: #00f2ff;
            --dense-glass: rgba(10, 15, 28, 0.92);
            --glass-blur: blur(35px) saturate(200%); /* Intense Blur */
            --glass-border: rgba(255, 255, 255, 0.12);
            --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        body { padding-top: 90px !important; }

        .spark-nav {
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%);
            width: 95%; max-width: 1100px; height: 60px;
            z-index: 10000; display: flex; align-items: center;
            border-radius: 12px; /* Square-ish modern corners */
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

        .nav-menu { display: flex; gap: 20px; align-items: center; }

        .nav-link, .drop-trigger {
            color: #fff; text-decoration: none;
            font-size: 1rem; font-weight: 700; background: none;
            border: none; padding: 10px 15px; border-radius: 8px;
            cursor: pointer; transition: var(--transition);
        }

        .nav-link:hover, .drop-trigger:hover { color: var(--nav-accent); background: rgba(255, 255, 255, 0.05); }

        /* DROPDOWN - Dense Glass Square Card */
        .nav-dropdown { position: relative; }
        .drop-menu {
            position: absolute; top: calc(100% + 15px); right: 0;
            background: var(--dense-glass);
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            min-width: 600px; border-radius: 15px;
            border: 1px solid var(--glass-border);
            padding: 20px; opacity: 0; visibility: hidden;
            transform: translateY(15px); transition: var(--transition);
            box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }
        
        /* 3-Column Grid for Calculators */
        .drop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }

        .nav-dropdown:hover .drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        .nav-dropdown:hover .chevron { transform: rotate(180deg); }

        .drop-menu a {
            color: rgba(255,255,255,0.8); padding: 10px 12px;
            text-decoration: none; display: block; font-size: 0.85rem;
            font-weight: 600; border-radius: 8px; transition: 0.2s;
            background: rgba(255,255,255,0.03);
        }
        .drop-menu a:hover { background: var(--nav-accent); color: #000; transform: scale(1.03); }

        .chevron {
            display: inline-block; width: 8px; height: 8px;
            border-right: 2px solid currentColor; border-bottom: 2px solid currentColor;
            transform: rotate(45deg); margin-left: 8px; transition: var(--transition);
        }

        /* MOBILE FIX: Square Card Expansion */
        .mobile-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; }
        .bar { width: 22px; height: 2px; background: var(--nav-accent); transition: var(--transition); }

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
                max-height: 80vh; overflow-y: auto;
            }
            .nav-menu.active { transform: translateY(0); opacity: 1; visibility: visible; }
            .nav-dropdown { width: 100%; }
            .drop-menu { 
                position: static; min-width: unset; width: 100%; opacity: 1; 
                visibility: visible; transform: none; display: none; 
                background: rgba(255,255,255,0.03); border: none; box-shadow: none; margin-top: 10px;
            }
            .nav-dropdown.active .drop-menu { display: block; }
            .drop-grid { grid-template-columns: 1fr 1fr; } /* 2 columns on mobile */
        }
    </style>
    `;

    // 4. INJECTION
    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 5. LOGIC
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
