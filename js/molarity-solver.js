
// 1. UNIT CONVERTER LOGIC
function convertUnits(type) {
    const ml = document.getElementById('input_ml');
    const l = document.getElementById('input_l');
    
    if (type === 'ml') {
        l.value = (parseFloat(ml.value) / 1000) || "";
    } else {
        ml.value = (parseFloat(l.value) * 1000) || "";
    }
}

// 2. FIXED DILUTION SOLVER
function calculateDilution() {
    const m1 = document.getElementById('m1').value;
    const v1 = document.getElementById('v1').value;
    const m2 = document.getElementById('m2').value;
    const v2 = document.getElementById('v2').value;

    const valM1 = parseFloat(m1);
    const valV1 = parseFloat(v1);
    const valM2 = parseFloat(m2);
    const valV2 = parseFloat(v2);

    let finalResult = "";

    // Check which field is empty and solve
    if (m1 === "" && !isNaN(valV1) && !isNaN(valM2) && !isNaN(valV2)) {
        finalResult = "Initial Molarity (M1): " + ((valM2 * valV2) / valV1).toFixed(4) + " M";
    } 
    else if (v1 === "" && !isNaN(valM1) && !isNaN(valM2) && !isNaN(valV2)) {
        finalResult = "Initial Volume (V1): " + ((valM2 * valV2) / valM1).toFixed(4);
    } 
    else if (m2 === "" && !isNaN(valM1) && !isNaN(valV1) && !isNaN(valV2)) {
        finalResult = "Final Molarity (M2): " + ((valM1 * valV1) / valV2).toFixed(4) + " M";
    } 
    else if (v2 === "" && !isNaN(valM1) && !isNaN(valV1) && !isNaN(valM2)) {
        finalResult = "Final Volume (V2): " + ((valM1 * valV1) / valM2).toFixed(4);
    } 
    else {
        alert("Please leave exactly one field empty to calculate.");
        return;
    }

    document.getElementById('dilution_res').innerText = finalResult;
    document.getElementById('dilution_results').style.display = 'block';
}

// 3. MOLARITY SOLVER (Keep your existing working function here)
function calculateMolarity() {
    const mass = parseFloat(document.getElementById('mass').value);
    const mm = parseFloat(document.getElementById('m_mass').value) || 1;
    const vol = parseFloat(document.getElementById('vol').value);
    const dens = parseFloat(document.getElementById('dens').value);
    const perc = parseFloat(document.getElementById('perc').value);

    let moles = 0, molarity = 0;

    if (!isNaN(dens) && !isNaN(perc) && dens > 0) {
        molarity = (perc * dens * 10) / mm;
        if (!isNaN(mass)) moles = mass / mm;
    } 
    else if (!isNaN(mass) && !isNaN(vol) && vol > 0) {
        moles = mass / mm;
        molarity = moles / vol;
    } else {
        alert("Enter Mass/Volume or Density/Percent.");
        return;
    }

    document.getElementById('out_n').innerText = moles.toFixed(4);
    document.getElementById('out_m').innerText = molarity.toFixed(4) + " mol/L";
    document.getElementById('results').style.display = 'block';
}
