/**
 * Universal Header Component for Chemistry Spark Lab
 * Forced Override Version - Fixes Overlapping & Hidden Menus
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. CLEAR OLD HEADERS (Removes any header style you currently have)
    const selectorsToClear = ['.main-header', '.top-header', 'header', '#header'];
    selectorsToClear.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
    });

    const headerHTML = `
    <nav class="universal-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">CHEMISTRY <span style="color:#fff;">SPARK</span></a>
            
            <button class="nav-toggle" id="mobile-toggle">☰</button>

            <div class="nav-links" id="nav-menu">
                <a href="index.html" class="nav-item">Home</a>
                
                <div class="nav-dropdown">
                    <button class="drop-btn">Calculators <span class="arrow">▾</span></button>
                    <div class="dropdown-content">
                        <a href="osmotic-pressure.html">Osmotic Pressure</a>
                        <a href="entropy-change.html">Entropy Change</a>
                        <a href="ph-calculator.html">pH Calculator</a>
                        <a href="molarity.html">Molarity Lab</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;

    const navStyles = `
    <style>
        :root { --nav-bg: rgba(10, 15, 28, 0.95); --nav-accent: #00f2ff; }
        
        body { padding-top: 75px !important; } /* Pushes content down so header doesn't cover it */

        .universal-nav {
            position: fixed; top: 0; left: 0; width: 100%; height: 70px;
            background: var(--nav-bg); backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 10000 !important; display: flex; align-items: center;
        }
        .nav-container {
            width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px;
            display: flex; justify-content: space-between; align-items: center;
        }
        .nav-logo {
            color: var(--nav-accent); text-decoration: none;
            font-weight: 800; font-size: 1.2rem; letter-spacing: 1px;
        }
        .nav-links { display: flex; gap: 25px; align-items: center; }
        .nav-item { color: #f1f5f9; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: 0.3s; }
        .nav-item:hover { color: var(--nav-accent); }

        /* Dropdown */
        .nav-dropdown { position: relative; }
        .drop-btn { background: none; border: none; color: #f1f5f9; font-weight: 600; font-size: 0.9rem; cursor: pointer; }
        .dropdown-content {
            display: none; position: absolute; right: 0; background: #111827;
            min-width: 200px; border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); overflow: hidden;
        }
        .dropdown-content a { color: #f1f5f9; padding: 12px 15px; text-decoration: none; display: block; font-size: 0.85rem; }
        .dropdown-content a:hover { background: var(--nav-accent); color: #000; }
        .nav-dropdown:hover .dropdown-content { display: block; }

        /* Mobile Toggle */
        .nav-toggle { display: none; background: none; border: none; color: var(--nav-accent); font-size: 1.5rem; cursor: pointer; }

        @media (max-width: 768px) {
            .nav-toggle { display: block; }
            .nav-links {
                display: none; position: absolute; top: 70px; left: 0; width: 100%;
                background: #0f172a; flex-direction: column; padding: 20px;
                border-bottom: 1px solid var(--nav-accent);
            }
            .nav-links.active { display: flex; }
            .nav-dropdown { width: 100%; text-align: center; }
            .dropdown-content { position: static; width: 100%; box-shadow: none; background: rgba(255,255,255,0.05); }
        }
    </style>
    `;

    // Inject styles and HTML
    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Mobile Toggle Logic
    const btn = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');
    if(btn) {
        btn.onclick = function() {
            menu.classList.toggle('active');
        };
    }
});
