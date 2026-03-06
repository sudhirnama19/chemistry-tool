
/**
 * Chemistry Spark Lab - Molarity & Dilution Engine
 * Logic: JEE/GATE/NET High-Level Calculations
 */

// 1. ADVANCED MOLARITY SOLVER
function calculateMolarity() {
    // Exact IDs from your HTML
    const massInput = document.getElementById('mass');
    const mmInput = document.getElementById('m_mass');
    const volInput = document.getElementById('vol');
    const densInput = document.getElementById('dens');
    const percInput = document.getElementById('perc');

    const mass = parseFloat(massInput.value);
    const mm = parseFloat(mmInput.value) || 1; // Prevent division by zero
    const vol = parseFloat(volInput.value);
    const dens = parseFloat(densInput.value);
    const perc = parseFloat(percInput.value);

    let moles = 0;
    let molarity = 0;

    // Logic: Density + Mass % Shortcut (GATE/NET Style)
    if (!isNaN(dens) && !isNaN(perc) && dens > 0 && perc > 0) {
        molarity = (perc * dens * 10) / mm;
        if (!isNaN(mass)) moles = mass / mm;
    } 
    // Logic: Standard Mass + Volume (NEET/JEE Style)
    else if (!isNaN(mass) && !isNaN(vol) && vol > 0) {
        moles = mass / mm;
        molarity = moles / vol;
    } else {
        alert("Error: Please enter either (Mass + Volume) or (Density + Mass %)");
        return;
    }

    // Update UI
    document.getElementById('out_n').innerText = moles.toFixed(4);
    document.getElementById('out_m').innerText = molarity.toFixed(4) + " mol/L";
    document.getElementById('results').style.display = 'block';
}

// 2. DILUTION CALCULATOR (M1V1 = M2V2)
function calculateDilution() {
    const m1 = parseFloat(document.getElementById('m1').value);
    const v1 = parseFloat(document.getElementById('v1').value);
    const m2 = parseFloat(document.getElementById('m2').value);
    const v2 = parseFloat(document.getElementById('v2').value);

    let resultText = "";

    // Solve for the missing variable
    if (isNaN(m1)) {
        let res = (m2 * v2) / v1;
        resultText = "Initial Molarity (M1): " + res.toFixed(4) + " M";
    } else if (isNaN(v1)) {
        let res = (m2 * v2) / m1;
        resultText = "Initial Volume (V1): " + res.toFixed(4) + " L";
    } else if (isNaN(m2)) {
        let res = (m1 * v1) / v2;
        resultText = "Final Molarity (M2): " + res.toFixed(4) + " M";
    } else if (isNaN(v2)) {
        let res = (m1 * v1) / m2;
        resultText = "Final Volume (V2): " + res.toFixed(4) + " L";
    }

    document.getElementById('dilution_res').innerText = resultText;
    document.getElementById('dilution_results').style.display = 'block';
}
