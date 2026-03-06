/**
 * Advanced Molality & Mole Fraction Engine
 * Optimized for JEE Advanced & GATE Difficulty
 */

// 1. MOLALITY SOLVER (with Density support)
function solveMolality() {
    const ms = parseFloat(document.getElementById('mass_s').value); // Solute Mass
    const mm = parseFloat(document.getElementById('mm_s').value);   // Molar Mass
    const mv = parseFloat(document.getElementById('mass_v').value); // Solvent Mass

    if (isNaN(ms) || isNaN(mm) || isNaN(mv)) {
        alert("Please enter all required values.");
        return;
    }

    const moles = ms / mm;
    const kg_solvent = mv / 1000; // Convert g to kg
    const molality = moles / kg_solvent;

    document.getElementById('out_m').innerText = molality.toFixed(4) + " mol/kg";
    document.getElementById('mol_res').style.display = 'block';
}

// 2. MOLE FRACTION SOLVER
function solveMoleFraction() {
    const nA = parseFloat(document.getElementById('moles_a').value);
    const nB = parseFloat(document.getElementById('moles_b').value);

    if (isNaN(nA) || isNaN(nB)) {
        alert("Please enter moles for both components.");
        return;
    }

    const totalMoles = nA + nB;
    const chiA = nA / totalMoles;
    const chiB = nB / totalMoles;

    document.getElementById('out_chi_a').innerText = chiA.toFixed(4);
    document.getElementById('out_chi_b').innerText = chiB.toFixed(4);
    document.getElementById('chi_res').style.display = 'block';
}
