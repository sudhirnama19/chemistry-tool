
/**
 * Universal Header Component for Chemistry Spark Lab
 * Injects a Glass-Morphism Navbar with Dropdowns
 */

document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
    <nav class="universal-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">CHEMISTRY SPARK LAB</a>
            
            <div class="nav-links">
                <a href="index.html" class="nav-item">Home</a>
                
                <div class="nav-dropdown">
                    <button class="drop-btn">Calculators <span class="arrow">▾</span></button>
                    <div class="dropdown-content">
                        <a href="osmotic-pressure.html">Osmotic Pressure</a>
                        <a href="entropy-change.html">Entropy Change</a>
                        <a href="gibbs-energy.html">Gibbs Free Energy</a>
                        <a href="molarity.html">Molarity & Mixing</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;

    // Inject styles specifically for the navbar
    const navStyles = `
    <style>
        .universal-nav {
            position: fixed;
            top: 0; left: 0; width: 100%;
            height: 70px;
            background: rgba(17, 24, 39, 0.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 9999;
            display: flex;
            align-items: center;
        }
        .nav-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .nav-logo {
            color: #00f2ff;
            text-decoration: none;
            font-weight: 800;
            font-size: 1.3rem;
            letter-spacing: 1px;
        }
        .nav-links {
            display: flex;
            gap: 30px;
            align-items: center;
        }
        .nav-item {
            color: #f1f5f9;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: 0.3s;
        }
        .nav-item:hover { color: #00f2ff; }

        /* Dropdown Styling */
        .nav-dropdown { position: relative; display: inline-block; }
        .drop-btn {
            background: none;
            border: none;
            color: #f1f5f9;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            padding: 10px 0;
            transition: 0.3s;
        }
        .nav-dropdown:hover .drop-btn { color: #00f2ff; }
        
        .dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(25px);
            min-width: 200px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            overflow: hidden;
            z-index: 10000;
            margin-top: 5px;
        }
        .dropdown-content a {
            color: #f1f5f9;
            padding: 12px 20px;
            text-decoration: none;
            display: block;
            font-size: 0.9rem;
            font-weight: 500;
            transition: 0.2s;
        }
        .dropdown-content a:hover {
            background: rgba(0, 242, 255, 0.1);
            color: #00f2ff;
        }
        .nav-dropdown:hover .dropdown-content { display: block; }
        
        .arrow { font-size: 0.7rem; margin-left: 5px; opacity: 0.7; }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-logo { font-size: 1rem; }
            .nav-links { gap: 15px; }
            .nav-item, .drop-btn { font-size: 0.85rem; }
        }
    </style>
    `;

    // Remove existing main-header if it exists
    const oldHeader = document.querySelector('.main-header');
    if (oldHeader) oldHeader.remove();

    // Prepend Styles and Nav to Body
    document.head.insertAdjacentHTML('beforeend', navStyles);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
});
