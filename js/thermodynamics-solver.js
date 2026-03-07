
// THE SMART PARSER (Integrated as requested)
function smartParser(value) {
    if (typeof value !== 'string') value = String(value);
    
    // Clean string but keep digits, dots, e, E, signs, and ^
    let cleaned = value.replace(/[^\d.eE\-\+\^]/g, ''); 
    
    // Handle exponents like 10^2
    if (cleaned.includes('^')) {
        let parts = cleaned.split('^');
        return Math.pow(parseFloat(parts[0]), parseFloat(parts[1]));
    }
    
    // Handle standard scientific notation like 1e-3
    return parseFloat(cleaned) || 0;
}

document.getElementById('analyze-btn').addEventListener('click', function() {
    // Applying smartParser to all numeric fields
    const n = smartParser(document.getElementById('n').value);
    const T1 = smartParser(document.getElementById('t1').value);
    const T2 = smartParser(document.getElementById('t2').value);
    const V1 = smartParser(document.getElementById('v1').value);
    const V2 = smartParser(document.getElementById('v2').value);
    const poly_x = smartParser(document.getElementById('poly_x').value);
    const Cv = smartParser(document.getElementById('cv_a').value);
    
    const R = 8.314; 
    const deltaT = T2 - T1;

    // Thermodynamic Logic
    const deltaU = n * Cv * deltaT;
    const deltaH = n * (Cv + R) * deltaT;

    let work;
    if (Math.abs(poly_x - 1) < 0.0001) {
        work = n * R * T1 * Math.log(V2 / V1);
    } else {
        work = (n * R * deltaT) / (1 - poly_x);
    }

    let deltaS = (n * Cv * Math.log(T2 / T1)) + (n * R * Math.log(V2 / V1));
    const deltaG = deltaH - (T2 * deltaS);

    // Update UI
    document.getElementById('res_u').innerText = (deltaU / 1000).toFixed(2) + " kJ";
    document.getElementById('res_w').innerText = (work / 1000).toFixed(2) + " kJ";
    document.getElementById('res_h').innerText = (deltaH / 1000).toFixed(2) + " kJ";
    document.getElementById('res_s').innerText = deltaS.toFixed(2) + " J/K";
    document.getElementById('res_g').innerText = (deltaG / 1000).toFixed(2) + " kJ";

    document.getElementById('result-area').style.display = 'block';
});
