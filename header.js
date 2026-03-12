/**
 * Chemistry Spark Lab - Ultra-Frost iOS Universal Header
 * Professional Compact Design | iOS Blur | Full Link Grid
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. FORCED CLEANUP: Removes any existing header elements to prevent duplication
    const legacyHeaders = ['.main-header', '.top-header', 'header', '#header', '.universal-nav', '.spark-nav', '.ios-nav'];
    legacyHeaders.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
    });

    // 2. HEADER STRUCTURE (Full Live Links from Chemistry Spark Lab)
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
                            <a href="equilibrium-constant-calculator.html">Equilibrium (Kc) Solver</a>
                            <a href="ionic-strength-calculator.html">Ionic Strength</a>
                            <a href="kinetics-calculator.html">Rate Kinetics</a>
                            <a href="stereoisomers-calculator.html">Stereoisomer Counter</a>
                            <a href="electrolysis-calculator.html">Electrolysis Solver</a>
                            <a href="emf-calculator.html">EMF (Nernst) Solver</a>
                            <a href="percent-yield-calculator.html">Percent Yield Lab</a>
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

    // 3. STYLING (Ultra-Frost Glass & Modern Grid)
    const navStyles = `
    <style>
        :root {
            --ios-blur: blur(25px) saturate(180%);
            --ios-bg: rgba(10, 15, 28, 0.72);
            --accent: #00f2ff;
            --font-nav: 1.1rem; /* Increased font size */
        }

        body { padding-top: 75px !important; }

        .ios-nav {
            position: fixed; top: 0; left: 0; width: 100%; height: 60px;
            z-index: 10000; display: flex; align-items: center;
            background: var(--ios-bg);
            backdrop-filter: var(--ios-blur);
            -webkit-backdrop-filter: var(--ios-blur);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
        }

        .nav-container {
            width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px;
            display: flex; justify-content: space-between; align-items: center;
        }

        .nav-brand {
            text-decoration: none; color: #fff; font-weight: 800; font-size: 1.4rem;
            letter-spacing: -0.5px; transition: 0.3s;
        }
        .brand-accent { color: var(--accent); margin-left: 2px; }

        .nav-links { display: flex; gap: 40px; align-items: center; }

        .nav-item, .drop-trigger {
            color: rgba(255,255,255,0.9); text-decoration: none;
            font-size: var(--font-nav); font-weight: 700; 
            background: none; border: none; cursor: pointer;
            transition: 0.2s ease; padding: 5px 0;
        }

        .nav-item:hover, .drop-trigger:hover { color: var(--accent); }

        /* DROPDOWN - Frost Effect Applied */
        .nav-dropdown { position: relative; }
        .drop-content {
            position: absolute; top: 100%; right: 0; margin-top: 15px;
            background: rgba(15, 23, 42, 0.85); /* Frosty background */
            backdrop-filter: blur(30px) saturate(160%);
            -webkit-backdrop-filter: blur(30px) saturate(160%);
            border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
            padding: 20px; width: 550px; opacity: 0; visibility: hidden;
            transform: translateY(12px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 25px 60px rgba(0,0,0,0.7);
        }
        
        .drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        /* Animation Trigger */
        .nav-dropdown:hover .drop-content { opacity: 1; visibility: visible; transform: translateY(0); }
        .nav-dropdown:hover .chevron { transform: rotate(180deg); }

        .drop-content a {
            color: rgba(255,255,255,0.8); padding: 12px 18px; text-decoration: none;
            font-size: 0.95rem; font-weight: 600; border-radius: 12px; transition: 0.2s;
            background: rgba(255,255,255,0.03); border: 1px solid transparent;
        }
        .drop-content a:hover { 
            background: rgba(0, 242, 255, 0.15); color: var(--accent); 
            border-color: rgba(0, 242, 255, 0.3); transform: scale(1.03);
        }

        .chevron {
            display: inline-block; width: 7px; height: 7px;
            border-right: 2.5px solid currentColor; border-bottom: 2.5px solid currentColor;
            transform: rotate(45deg); margin-left: 8px; margin-bottom: 3px;
            transition: transform 0.3s ease;
        }

        /* MOBILE MENU LOGIC */
        .menu-toggle { display: none; flex-direction: column; gap: 6px; background: none; border: none; cursor: pointer; padding: 5px; }
        .menu-toggle .bar { width: 24px; height: 2px; background: var(--accent); border-radius: 2px; transition: 0.3s; }

        @media (max-width: 992px) {
            .drop-content { width: 450px; }
            .nav-links { gap: 25px; }
        }

        @media (max-width: 768px) {
            .menu-toggle { display: flex; }
            .nav-links {
                position: fixed; top: 60px; left: 0; width: 100%; height: 0;
                background: rgba(10, 15, 28, 0.98); flex-direction: column; 
                overflow: hidden; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); padding: 0;
            }
            .nav-links.active { height: calc(100vh - 60px); padding-top: 30px; overflow-y: auto; }
            .nav-dropdown { width: 100%; text-align: center; }
            .drop-content { 
                position: static; width: 100%; opacity: 1; visibility: visible; 
                transform: none; display: none; background: transparent; border: none; box-shadow: none; 
            }
            .nav-dropdown.active .drop-content { display: block; }
            .drop-grid { grid-template-columns: 1fr; padding: 0 20px; }
        }
    </style>
    `;

    // 4. DOM INJECTION
    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 5. INTERACTIVITY & EVENTS
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropBtn = document.getElementById('dropBtn');
    const dropWrapper = document.getElementById('dropWrapper');

    // Mobile Hamburger Animation & Menu Toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const bars = mobileToggle.querySelectorAll('.bar');
        if(navMenu.classList.contains('active')) {
            bars[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            bars[0].style.transform = ""; bars[1].style.opacity = "1"; bars[2].style.transform = "";
        }
    });

    // Mobile Dropdown Click Override
    dropBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropWrapper.classList.toggle('active');
        }
    });

    // Close mobile menu on larger screen resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            dropWrapper.classList.remove('active');
        }
    });
});
