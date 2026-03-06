
/**
 * Advanced Molarity Solver - JEE/GATE/NET Edition
 * Logic: Standard Volumetric + Density-Mass % Shortcut
 */

function calculateMolarity() {
    // 1. Capture Inputs using the IDs from your HTML
    const mass = parseFloat(document.getElementById('mass').value);
    const mm = parseFloat(document.getElementById('m_mass').value);
    const vol = parseFloat(document.getElementById('vol').value);
    const dens = parseFloat(document.getElementById('dens').value);
    const perc = parseFloat(document.getElementById('perc').value);

    // 2. Initialize Result Variables
    let moles = 0;
    let molarity = 0;

    // 3. JEE Advanced / GATE Specific Logic
    // CASE A: Density and Mass % are provided (High-level shortcut)
    if (!isNaN(dens) && !isNaN(perc) && dens > 0 && perc > 0) {
        // Formula: M = (% * d * 10) / Molar Mass
        molarity = (perc * dens * 10) / mm;
        
        // Back-calculate moles if mass is provided
        if (!isNaN(mass)) {
            moles = mass / mm;
        }
    } 
    // CASE B: Standard Mass and Volume are provided
    else if (!isNaN(mass) && !isNaN(vol) && vol > 0) {
        moles = mass / mm;
        molarity = moles / vol;
    } 
    else {
        alert("Please enter either (Mass + Volume) or (Density + Mass %)");
        return;
    }

    // 4. Update UI with High Precision
    const resultArea = document.getElementById('results');
    if (resultArea) {
        document.getElementById('out_n').innerText = moles.toFixed(4);
        document.getElementById('out_m').innerText = molarity.toFixed(4) + " mol/L";
        resultArea.style.display = 'block'; // Make results visible
    }
}

// Ensure the button in your HTML calls this function: onclick="calculateMolarity()"
