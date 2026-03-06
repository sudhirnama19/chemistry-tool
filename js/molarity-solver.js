/**
 * Advanced Molarity Engine - JEE/GATE/NET Edition
 * Handles: Density conversions, Mass %, and Dilution
 */
class MolarityEngine {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('solve-molarity').addEventListener('click', () => this.calculate());
    }

    calculate() {
        const mass = parseFloat(document.getElementById('solute_mass').value) || 0;
        const molarMass = parseFloat(document.getElementById('molar_mass').value) || 1;
        const volumeL = parseFloat(document.getElementById('vol_liters').value) || 0;
        const density = parseFloat(document.getElementById('density').value) || 0;
        const massPercent = parseFloat(document.getElementById('mass_percent').value) || 0;

        let moles = mass / molarMass;
        let molarity = 0;

        // Logic for JEE Advanced: Molarity from Mass % and Density
        if (massPercent > 0 && density > 0) {
            molarity = (massPercent * density * 10) / molarMass;
        } 
        // Logic for Standard Molarity
        else if (volumeL > 0) {
            molarity = moles / volumeL;
        }

        this.updateUI(moles, molarity);
    }

    updateUI(n, m) {
        document.getElementById('res_moles').innerText = n.toFixed(4);
        document.getElementById('res_molarity').innerText = m.toFixed(3) + " mol/L";
        document.getElementById('molarity-results').style.display = 'block';
    }
}
new MolarityEngine();
