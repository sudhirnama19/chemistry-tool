// Smart Parser to handle scientific notation and special characters
function smartParser(value) {
    if (typeof value !== 'string') value = String(value);
    // Replace custom symbols if necessary, then parse
    let cleaned = value.replace(/[^\d.eE\-\+]/g, ''); 
    return parseFloat(cleaned) || 0;
}

document.getElementById('analyze-btn').addEventListener('click', function() {
    // 1. Get Inputs using the smartParser
    const n = smartParser(document.getElementById('n').value);
    const T1 = smartParser(document.getElementById('t1').value);
    const T2 = smartParser(document.getElementById('t2').value);
    const V1 = smartParser(document.getElementById('v1').value);
    const V2 = smartParser(document.getElementById('v2').value);
    const poly_x = smartParser(document.getElementById('poly_x').value);
    const Cv = smartParser(document.getElementById('cv_a').value);
    
    // Constants
    const R = 8.314; // Universal gas constant in J/(mol·K)
    const deltaT = T2 - T1;

    // 2. Calculations (Internal Energy & Enthalpy)
    const deltaU = n * Cv * deltaT; // result in Joules
    const deltaH = n * (Cv + R) * deltaT; // result in Joules

    // 3. Work Done (W) for Polytropic Process
    let work;
    if (Math.abs(poly_x - 1) < 0.0001) {
        // Isothermal case (x = 1): W = nRT ln(V2/V1)
        work = n * R * T1 * Math.log(V2 / V1);
    } else {
        // General Polytropic: W = nR(T2 - T1) / (1 - x)
        work = (n * R * deltaT) / (1 - poly_x);
    }

    // 4. Entropy Change (Delta S)
    // Formula: dS = n*Cv*ln(T2/T1) + n*R*ln(V2/V1)
    let deltaS = 0;
    if (T1 > 0 && T2 > 0 && V1 > 0 && V2 > 0) {
        deltaS = (n * Cv * Math.log(T2 / T1)) + (n * R * Math.log(V2 / V1));
    }

    // 5. Gibbs Free Energy (Delta G)
    // dG = dH - d(TS). For non-isothermal: G = H - T2*S2 + T1*S1
    // Simplification for student tools: dG ≈ dH - T2*dS
    const deltaG = deltaH - (T2 * deltaS);

    // 6. UI Update (Converting J to kJ for readability)
    const toKJ = (val) => (val / 1000).toFixed(2);

    document.getElementById('res_u').innerText = toKJ(deltaU) + " kJ";
    document.getElementById('res_w').innerText = toKJ(work) + " kJ";
    document.getElementById('res_h').innerText = toKJ(deltaH) + " kJ";
    document.getElementById('res_s').innerText = deltaS.toFixed(2) + " J/K";
    document.getElementById('res_g').innerText = toKJ(deltaG) + " kJ";

    // 7. Spontaneity Check
    const resBox = document.getElementById('result-area');
    const spontText = document.getElementById('res_spont');
    
    resBox.style.display = 'block';

    if (deltaG < 0) {
        spontText.innerText = "✓ Spontaneous Process";
        spontText.style.color = "#00ffd5";
    } else if (deltaG > 0) {
        spontText.innerText = "⚠ Non-Spontaneous Process";
        spontText.style.color = "#ff4d4d";
    } else {
        spontText.innerText = "⚙ System at Equilibrium";
        spontText.style.color = "#3b82f6";
    }
});
