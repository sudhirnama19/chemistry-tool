/**
 * Chemistry Spark Lab - Modern Universal Header (v2.0)
 * Modern Aesthetic, Glass-morphism, and Fluid Animations
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. CLEANUP: Remove any existing headers to prevent overlaps
    const legacyHeaders = ['.main-header', '.top-header', 'header', '#header', '.universal-nav'];
    legacyHeaders.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
    });

    // 2. HEADER STRUCTURE
    const headerHTML = `
    <nav class="spark-nav">
        <div class="nav-blur-bg"></div>
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
                            <a href="osmotic-pressure.html">Osmotic Pressure</a>
                            <a href="entropy-change.html">Entropy Change</a>
                            <a href="ph-calculator.html">pH Calculator</a>
                            <a href="molarity.html">Molarity Lab</a>
                            <a href="gibbs-energy.html">Gibbs Free Energy</a>
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

    // 3. MODERN STYLING (Aesthetic & Animations)
    const navStyles = `
    <style>
        :root {
            --nav-accent: #00f2ff;
            --nav-bg: rgba(3, 7, 18, 0.8);
            --glass-border: rgba(255, 255, 255, 0.08);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body { padding-top: 80px !important; }

        .spark-nav {
            position: fixed; top: 15px; left: 50%; transform: translateX(-50%);
            width: 95%; max-width: 1100px; height: 65px;
            z-index: 10000; display: flex; align-items: center;
            border-radius: 20px; border: 1px solid var(--glass-border);
            background: var(--nav-bg); backdrop-filter: blur(15px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            transition: var(--transition);
        }

        .nav-container {
            width: 100%; display: flex; justify-content: space-between;
            align-items: center; padding: 0 25px;
        }

        .nav-brand {
            text-decoration: none; font-weight: 800; font-size: 1.2rem;
            letter-spacing: 1px; display: flex; align-items: center;
        }
        .brand-spark { color: var(--nav-accent); }
        .brand-lab { color: #ffffff; margin-left: 5px; opacity: 0.9; }

        .nav-menu { display: flex; gap: 30px; align-items: center; }

        .nav-link, .drop-trigger {
            color: rgba(255,255,255,0.7); text-decoration: none;
            font-size: 0.9rem; font-weight: 600; background: none;
            border: none; padding: 8px 12px; border-radius: 10px;
            cursor: pointer; transition: var(--transition);
        }

        .nav-link:hover, .drop-trigger:hover { color: var(--nav-accent); background: rgba(0, 242, 255, 0.05); }

        /* Modern Dropdown Animation */
        .nav-dropdown { position: relative; }
        .drop-menu {
            position: absolute; top: calc(100% + 15px); right: 0;
            background: rgba(13, 18, 30, 0.98); min-width: 220px;
            border-radius: 15px; border: 1px solid var(--glass-border);
            padding: 10px; opacity: 0; visibility: hidden;
            transform: translateY(10px); transition: var(--transition);
            box-shadow: 0 15px 40px rgba(0,0,0,0.6);
        }
        
        .nav-dropdown:hover .drop-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        .nav-dropdown:hover .chevron { transform: rotate(180deg); }

        .drop-menu a {
            color: rgba(255,255,255,0.8); padding: 12px 16px;
            text-decoration: none; display: block; font-size: 0.85rem;
            border-radius: 10px; transition: 0.2s;
        }
        .drop-menu a:hover { background: var(--nav-accent); color: #000; font-weight: 700; transform: translateX(5px); }

        .chevron {
            display: inline-block; width: 8px; height: 8px;
            border-right: 2px solid currentColor; border-bottom: 2px solid currentColor;
            transform: rotate(45deg); margin-left: 8px; margin-bottom: 3px;
            transition: var(--transition);
        }

        /* Mobile Hamburger Design */
        .mobile-toggle { display: none; flex-direction: column; gap: 6px; cursor: pointer; border: none; background: none; }
        .bar { width: 24px; height: 2px; background: var(--nav-accent); transition: var(--transition); border-radius: 2px; }

        @media (max-width: 768px) {
            .mobile-toggle { display: flex; }
            .nav-menu {
                position: absolute; top: 80px; left: 0; width: 100%;
                background: #0a0f1c; flex-direction: column; padding: 25px;
                border-radius: 20px; border: 1px solid var(--glass-border);
                transform: translateY(-20px); opacity: 0; visibility: hidden;
                transition: var(--transition);
            }
            .nav-menu.active { transform: translateY(0); opacity: 1; visibility: visible; }
            .nav-dropdown { width: 100%; }
            .drop-menu { position: static; opacity: 1; visibility: visible; transform: none; box-shadow: none; display: none; margin-top: 10px; background: rgba(255,255,255,0.03); }
            .nav-dropdown.active .drop-menu { display: block; }
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

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const bars = mobileToggle.querySelectorAll('.bar');
        bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : '';
        bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    // Mobile Dropdown Click Logic
    dropTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownWrapper.classList.toggle('active');
        }
    });

    // Auto-close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            dropdownWrapper.classList.remove('active');
        }
    });
});
