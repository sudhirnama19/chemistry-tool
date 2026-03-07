
document.getElementById('analyze-btn').addEventListener('click', function() {
    // 1. Get Inputs using smartParser logic for scientific notation
    const n = parseFloat(document.getElementById('n').value) || 0;
    const T1 = parseFloat(document.getElementById('t1').value) || 0;
    const T2 = parseFloat(document.getElementById('t2').value) || 0;
    const V1 = parseFloat(document.getElementById('v1').value) || 0;
    const V2 = parseFloat(document.getElementById('v2').value) || 0;
    const poly_x = parseFloat(document.getElementById('poly_x').value) || 1;
    const Cv = parseFloat(document.getElementById('cv_a').value) || 12.47;
    
    const R = 8.314; // J/(mol·K)
    const deltaT = T2 - T1;

    // 2. Core Thermodynamic Calculations
    // Delta U = n * Cv * Delta T
    const deltaU = n * Cv * deltaT;

    // Delta H = n * (Cv + R) * Delta T
    const Cp = Cv + R;
    const deltaH = n * Cp * deltaT;

    // Work Done (W) - Polytropic Process: W = nR(T2-T1)/(1-x)
    let work;
    if (poly_x === 1) {
        // Isothermal case: W = nRT ln(V2/V1)
        work = n * R * T1 * Math.log(V2 / V1);
    } else {
        work = (n * R * deltaT) / (1 - poly_x);
    }

    // Delta S = n*Cv*ln(T2/T1) + n*R*ln(V2/V1)
    const deltaS = (n * Cv * Math.log(T2 / T1)) + (n * R * Math.log(V2 / V1));

    // Delta G = Delta H - (T2 * Delta S)
    const deltaG = deltaH - (T2 * deltaS);

    // 3. Display Results with Units
    document.getElementById('res_u').innerText = (deltaU / 1000).toFixed(2) + " kJ";
    document.getElementById('res_w').innerText = (work / 1000).toFixed(2) + " kJ";
    document.getElementById('res_h').innerText = (deltaH / 1000).toFixed(2) + " kJ";
    document.getElementById('res_s').innerText = deltaS.toFixed(2) + " J/K";
    document.getElementById('res_g').innerText = (deltaG / 1000).toFixed(2) + " kJ";

    // 4. Spontaneity Logic Check
    const spontElement = document.getElementById('res_spont');
    if (deltaG < 0) {
        spontElement.innerHTML = "✓ Spontaneous Process (Exergonic)";
        spontElement.style.color = "#00ffd5";
    } else if (deltaG > 0) {
        spontElement.innerHTML = "⚠ Non-Spontaneous (Endergonic)";
        spontElement.style.color = "#ff4d4d";
    } else {
        spontElement.innerHTML = "⚙ System at Equilibrium";
        spontElement.style.color = "#3b82f6";
    }

    // Show the result box
    document.getElementById('result-area').style.display = 'block';
});
