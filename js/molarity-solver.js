
/**
 * Chemistry Spark Lab - Advanced Thermo Solver
 * Fixed: Input ID Mapping & Calculus Integration
 */

const R = 8.314; // J/mol·K

function analyzeProcess() {
    console.log("Analysis Started..."); // Debugging check

    try {
        // 1. Get Inputs (Using exact IDs from your screenshots)
        const n = parseFloat(document.getElementById('n').value);
        const T1 = parseFloat(document.getElementById('t1').value);
        const T2 = parseFloat(document.getElementById('t2').value);
        const V1 = parseFloat(document.getElementById('v1').value);
        const V2 = parseFloat(document.getElementById('v2').value);
        const x = parseFloat(document.getElementById('poly_x').value);
        const a = parseFloat(document.getElementById('cv_a').value); // Cv Constant
        const b = parseFloat(document.getElementById('cv_b').value); // Cv Slope

        // Validation: Prevent crash if empty
        if (isNaN(n) || isNaN(T1)) {
            alert("Please fill in all numerical values.");
            return;
        }

        // 2. ADVANCED LOGIC: Internal Energy (ΔU) via Integration
        // ΔU = n * [a(T2 - T1) + 0.5 * b * (T2^2 - T1^2)]
        const deltaU = n * (a * (T2 - T1) + 0.5 * b * (Math.pow(T2, 2) - Math.pow(T1, 2)));

        // 3. ADVANCED LOGIC: Work (W)
        let work = 0;
        if (Math.abs(x - 1) < 0.001) {
            // Reversible Isothermal Expansion: W = -2.303 nRT log(V2/V1)
            work = -2.303 * n * R * T1 * Math.log10(V2 / V1);
        } else {
            // Polytropic Process: W = nR(T2 - T1) / (1 - x)
            work = (n * R * (T2 - T1)) / (1 - x);
        }

        // 4. First Law: Heat (Q) = ΔU - W (IUPAC Chemistry)
        const q = deltaU - work;

        // 5. Entropy (ΔS) - Multi-variable formula
        const dS = (2.303 * n * a * Math.log10(T2 / T1)) + (2.303 * n * R * Math.log10(V2 / V1));

        // Update UI
        document.getElementById('res_u').innerText = deltaU.toFixed(2) + " J";
        document.getElementById('res_w').innerText = work.toFixed(2) + " J";
        document.getElementById('res_q').innerText = q.toFixed(2) + " J";
        document.getElementById('res_s').innerText = dS.toFixed(3) + " J/K";
        
        // Make result area visible
        document.getElementById('result-area').style.display = 'block';

    } catch (error) {
        console.error("Calculation Error:", error);
        alert("Error: Check your input units or values.");
    }
}

// Ensure the button in HTML has: id="analyze-btn"
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('analyze-btn');
    if(btn) btn.onclick = analyzeProcess;
});
