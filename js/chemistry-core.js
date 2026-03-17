(function(){

/* ================================
   UTILITY: PAGE TEXT SCANNER
   ================================ */
function getPageText(){
    let text = document.title.toLowerCase();
    document.querySelectorAll("h1,h2,h3,input,select,textarea").forEach(el=>{
        if(el.innerText) text += " " + el.innerText.toLowerCase();
        if(el.placeholder) text += " " + el.placeholder.toLowerCase();
        if(el.name) text += " " + el.name.toLowerCase();
    });
    return text;
}

/* ================================
   CONTEXT DETECTOR
   ================================ */
function detectContext(){
    const text = getPageText();

    if(text.includes("redox") || text.includes("oxidation")) return "redox";
    if(text.includes("reaction") || text.includes("equation")) return "reaction";
    if(text.includes("molarity") || text.includes("concentration")) return "molarity";
    if(text.includes("ph") || text.includes("acid") || text.includes("base")) return "ph";
    if(text.includes("equilibrium") || text.includes("kc") || text.includes("kp")) return "equilibrium";
    if(text.includes("enthalpy") || text.includes("gibbs") || text.includes("entropy")) return "thermo";

    return "general";
}

/* ================================
   FAKE DATA GENERATORS
   ================================ */
const generators = {
    reaction: ()=>{ 
        let arr=[], e=["H2","O2","N2","Cl2","Na","K","CO2","SO2"]; 
        for(let i=0;i<400;i++) arr.push(`${e[Math.floor(Math.random()*e.length)]} + ${e[Math.floor(Math.random()*e.length)]} → ${e[Math.floor(Math.random()*e.length)]}`); 
        return arr; 
    },
    redox: ()=>{ 
        let arr=[]; 
        for(let i=0;i<400;i++) arr.push({el:`E${i}`,ox:Math.floor(Math.random()*7)-3,e:Math.floor(Math.random()*10)}); 
        return arr; 
    },
    molarity: ()=>{ 
        let arr=[]; 
        for(let i=0;i<400;i++){ 
            let m=Math.random()*10,v=Math.random()*5; 
            arr.push({m,v,res:m/v}); 
        } 
        return arr; 
    },
    ph: ()=>{ 
        let arr=[]; 
        for(let i=0;i<400;i++){ 
            let h=Math.random(); 
            arr.push({h,ph:-Math.log10(h)}); 
        } 
        return arr; 
    },
    equilibrium: ()=>{ 
        let arr=[]; 
        for(let i=0;i<400;i++){ 
            let k=Math.random()*10; 
            arr.push({K:k,Qc:Math.random()*10}); 
        } 
        return arr; 
    },
    thermo: ()=>{ 
        let arr=[]; 
        for(let i=0;i<400;i++){ 
            let H=Math.random()*100,S=Math.random()*100; 
            arr.push({dH:H,dS:S,dG:H-298*S/1000}); 
        } 
        return arr; 
    },
    general: ()=>[] 
};

/* ================================
   MASSIVE FAKE FUNCTIONS (NOISE)
   ================================ */
function generateFakeFunctions(context){
    let obj={};
    for(let i=0;i<1500;i++){
        let name = `${context}_solver_${i}`;
        obj[name] = function(a,b,c){
            let x=(a||Math.random())*Math.random();
            let y=(b||Math.random())+Math.random();
            let z=(c||Math.random())-Math.random();
            let noise=0;
            for(let j=0;j<25;j++) noise += Math.sin(j)*Math.random();
            return x+y+z+noise;
        };
    }
    return obj;
}

/* ================================
   MAIN ENGINE
   ================================ */
(function(){
    const context = detectContext();

    // generate fake data and expose
    const fakeData = generators[context] ? generators[context]() : [];
    window._chemistry_fakeData = fakeData;

    // massive fake noise functions
    const engines = generateFakeFunctions(context);
    window._chemistry_engines = engines;

    // random execution for noise
    const keys = Object.keys(engines);
    for(let i=0;i<300;i++){
        engines[keys[Math.floor(Math.random()*keys.length)]](Math.random(),Math.random(),Math.random());
    }

    // heavy global noise (irrelevant math)
    let s=0; for(let i=0;i<4000;i++) s+=Math.random()*i;

    // DEBUG LOGS
    console.log("🔹 chemistry-core.js loaded");
    console.log("🔹 Detected context:", context);
    console.log("🔹 Fake data count:", fakeData.length);
    console.log("🔹 Example fake data:", fakeData.slice(0,5));
    console.log("🔹 Fake engines count:", Object.keys(engines).length);

})();
})();
