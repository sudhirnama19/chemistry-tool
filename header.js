/**
 * Chemistry Spark Lab - Ultra-Frost iOS Universal Header (v3.0)
 * FIX: Mobile Full-Screen Blur, Line Removal, and Smooth Expansion
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. FORCED CLEANUP: Remove old headers
    const legacyHeaders = ['.main-header', '.top-header', 'header', '#header', '.universal-nav', '.spark-nav', '.ios-nav'];
    legacyHeaders.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
    });

    const headerHTML = `
    <nav class="ios-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-brand">
                CHEMISTRY<span class="brand-accent">LAB</span>
            </a>
            
            <div class="nav-links" id="navMenu">
                <a href="index.html" class="nav-item">Home</a>
                
                <div class="nav-dropdown" id="dropWrapper">
                    <button class="drop-trigger" id="dropBtn">
                        Calculators <span class="chevron"></span>
                    </button>
                    <div class="drop-content">
                        <div class="drop-grid">
                            <a href="ph-calculator.html">pH Calculator</a>
                            <a href="poh-calculator.html">pOH Calculator</a>
                            <a href="buffer-calculator.html">Buffer Solver</a>
                            <a href="molarity-calculator.html">Molarity Lab</a>
                            <a href="molality-calculator.html">Molality Solver</a>
                            <a href="normality-calculator.html">Normality Solver</a>
                            <a href="titration-calculator.html">Titration Curve</a>
                            <a href="entropy-change.html">Entropy Change</a>
                            <a href="gibbs-energy.html">Gibbs Free Energy</a>
                            <a href="equilibrium-constant-calculator.html">Equilibrium (Kc)</a>
                            <a href="ionic-strength-calculator.html">Ionic Strength</a>
                            <a href="kinetics-calculator.html">Rate Kinetics</a>
                            <a href="stereoisomers-calculator.html">Stereoisomers</a>
                            <a href="electrolysis-calculator.html">Electrolysis</a>
                            <a href="emf-calculator.html">EMF (Nernst)</a>
                            <a href="percent-yield-calculator.html">Percent Yield</a>
                            <a href="pka-pkb-calculator.html">pKa & pKb Solver</a>
                            <a href="empirical-formula-calculator.html">Empirical Formula</a>
                            <a href="ppm-ppb-calculator.html">ppm / ppb Solver</a>
                            <a href="stoichiometry-calculator.html">Stoichiometry Lab</a>
                        </div>
                    </div>
                </div>
            </div>

            <button class="menu-toggle" id="mobileToggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
        </div>
    </nav>
    `;

    const navStyles = `
    <style>
        :root {
            --ios-blur: blur(25px) saturate(200%);
            --ios-bg: rgba(10, 15, 28, 0.75);
            --accent: #00f2ff;
        }

        body { padding-top: 60px !important; }

        .ios-nav {
            position: fixed; top: 0; left: 0; width: 100%; height: 60px;
            z-index: 10000; display: flex; align-items: center;
            background: var(--ios-bg);
            backdrop-filter: var(--ios-blur);
            -webkit-backdrop-filter: var(--ios-blur);
            /* REMOVED THE DARK BORDER LINE */
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 2px 15px rgba(0,0,0,0.2);
        }

        .nav-container {
            width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px;
            display: flex; justify-content: space-between; align-items: center;
        }

        .nav-brand {
            text-decoration: none; color: #fff; font-weight: 800; font-size: 1.3rem;
            letter-spacing: -0.5px;
        }
        .brand-accent { color: var(--accent); }

        .nav-links { display: flex; gap: 35px; align-items: center; }

        .nav-item, .drop-trigger {
            color: rgba(255,255,255,0.9); text-decoration: none;
            font-size: 1.05rem; font-weight: 700; background: none; border: none; cursor: pointer;
        }

        /* DESKTOP DROPDOWN */
        .nav-dropdown { position: relative; }
        .drop-content {
            position: absolute; top: 100%; right: 0; margin-top: 15px;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: var(--ios-blur);
            -webkit-backdrop-filter: var(--ios-blur);
            border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
            padding: 20px; width: 550px; opacity: 0; visibility: hidden;
            transform: translateY(10px); transition: 0.3s;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }
        .drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .nav-dropdown:hover .drop-content { opacity: 1; visibility: visible; transform: translateY(0); }

        .drop-content a {
            color: rgba(255,255,255,0.8); padding: 10px 15px; text-decoration: none;
            font-size: 0.9rem; font-weight: 600; border-radius: 10px; transition: 0.2s;
            background: rgba(255,255,255,0.03);
        }
        .drop-content a:hover { background: rgba(0, 242, 255, 0.15); color: var(--accent); }

        .chevron {
            display: inline-block; width: 7px; height: 7px;
            border-right: 2px solid currentColor; border-bottom: 2px solid currentColor;
            transform: rotate(45deg); margin-left: 5px; transition: 0.3s;
        }

        /* MOBILE FIXES */
        .menu-toggle { display: none; flex-direction: column; gap: 6px; background: none; border: none; cursor: pointer; }
        .menu-toggle span { width: 24px; height: 2px; background: #fff; transition: 0.3s; }

        @media (max-width: 768px) {
            .menu-toggle { display: flex; z-index: 10001; }
            .nav-links {
                position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
                background: rgba(10, 15, 28, 0.85); /* Frost background for full mobile screen */
                backdrop-filter: blur(25px) saturate(180%);
                -webkit-backdrop-filter: blur(25px) saturate(180%);
                flex-direction: column; justify-content: flex-start;
                padding-top: 100px; gap: 30px;
                opacity: 0; visibility: hidden; transition: 0.4s;
            }
            .nav-links.active { opacity: 1; visibility: visible; }

            .nav-dropdown { width: 100%; text-align: center; }
            .drop-content { 
                position: static; width: 90%; margin: 10px auto; 
                opacity: 1; visibility: visible; display: none; 
                transform: none; background: rgba(255,255,255,0.05);
            }
            .nav-dropdown.active .drop-content { display: block; }
            .nav-dropdown.active .chevron { transform: rotate(-135deg); }
            .drop-grid { grid-template-columns: 1fr; }
        }
    </style>
    `;

    // 4. INJECTION
    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 5. INTERACTIVITY
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropBtn = document.getElementById('dropBtn');
    const dropWrapper = document.getElementById('dropWrapper');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const bars = mobileToggle.querySelectorAll('span');
        if(navMenu.classList.contains('active')) {
            bars[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            bars[0].style.transform = ""; bars[1].style.opacity = "1"; bars[2].style.transform = "";
        }
    });

    dropBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropWrapper.classList.toggle('active');
        }
    });
});
