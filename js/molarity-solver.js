
/**
 * Advanced Molarity Solver logic for NEET, JEE, and GATE
 */
function calculateMolarity() {
    const mass = parseFloat(document.getElementById('mass').value) || 0;
    const mm = parseFloat(document.getElementById('m_mass').value) || 1;
    const vol = parseFloat(document.getElementById('vol').value) || 0;
    const dens = parseFloat(document.getElementById('dens').value) || 0;
    const perc = parseFloat(document.getElementById('perc').value) || 0;

    let moles = mass / mm;
    let molarity = 0;

    // Advanced formula: M = (% * d * 10) / Mw
    if (dens > 0 && perc > 0) {
        molarity = (perc * dens * 10) / mm;
    } else if (vol > 0) {
        molarity = moles / vol;
    }

    document.getElementById('out_n').innerText = moles.toFixed(4);
    document.getElementById('out_m').innerText = molarity.toFixed(4) + " mol/L";
    document.getElementById('results').style.display = 'block';
}
