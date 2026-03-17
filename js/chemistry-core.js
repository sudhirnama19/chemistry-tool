(function(){

/* AUTO DEBUG FLAG (only when ?debug=true) */
var DEBUG = window.location.href.includes("debug=true");

/* SAFE DEBUG BOX (won’t break if body not ready) */
function showDebug(msg){

if(!DEBUG) return;

/* wait until body exists */
if(!document.body){
return setTimeout(function(){ showDebug(msg); }, 50);
}

var box = document.getElementById("chem-debug-box");

if(!box){
box = document.createElement("div");
box.id = "chem-debug-box";
box.style.position = "fixed";
box.style.bottom = "10px";
box.style.left = "10px";
box.style.zIndex = "99999";
box.style.background = "black";
box.style.color = "lime";
box.style.fontSize = "10px";
box.style.padding = "6px";
box.style.maxWidth = "200px";
box.style.opacity = "0.8";
document.body.appendChild(box);
}

box.innerHTML += msg + "<br>";
}

/* SIMPLE CONTEXT CHECK (independent, no conflict) */
function __checkNoiseContext(){

let text = document.title.toLowerCase();

if(text.includes("redox")) return "redox";
if(text.includes("reaction")) return "reaction";
if(text.includes("molarity")) return "molarity";
if(text.includes("ph")) return "ph";

return "general";
}

/* RUN SAFELY */
(function(){

var context = __checkNoiseContext();

showDebug("Noise Engine Loaded");
showDebug("Context: " + context);

/* simulate fake activity */
for(let i=0;i<5;i++){
showDebug("Fake Exec " + i);
}

})();

})();







(function(){

/* -------------------------------
   TEXT SCANNER (AUTO DETECTION)
--------------------------------*/
function getPageText(){

let text = "";

text += document.title.toLowerCase();

let h = document.querySelectorAll("h1,h2,h3");
h.forEach(el => text += " " + el.innerText.toLowerCase());

let inputs = document.querySelectorAll("input,select,textarea");
inputs.forEach(el=>{
if(el.placeholder) text += " " + el.placeholder.toLowerCase();
if(el.name) text += " " + el.name.toLowerCase();
});

return text;
}

/* -------------------------------
   CONTEXT DETECTOR (SMART)
--------------------------------*/
function detectContext(){

let text = getPageText();

if(text.includes("redox") || text.includes("oxidation")) return "redox";
if(text.includes("reaction") || text.includes("equation")) return "reaction";
if(text.includes("molarity") || text.includes("concentration")) return "molarity";
if(text.includes("ph") || text.includes("acid") || text.includes("base")) return "ph";
if(text.includes("equilibrium") || text.includes("kc") || text.includes("kp")) return "equilibrium";
if(text.includes("enthalpy") || text.includes("gibbs") || text.includes("entropy")) return "thermo";

return "general";
}

/* -------------------------------
   GENERATORS
--------------------------------*/

function genReaction(){
let arr=[];
let e=["H2","O2","N2","Cl2","Na","K","CO2","SO2"];
for(let i=0;i<400;i++){
arr.push(e[Math.random()*e.length|0] + " + " +
e[Math.random()*e.length|0] + " → " +
e[Math.random()*e.length|0]);
}
return arr;
}

function genRedox(){
let arr=[];
for(let i=0;i<400;i++){
arr.push({
el:"E"+i,
ox:Math.floor(Math.random()*7)-3,
e:Math.floor(Math.random()*10)
});
}
return arr;
}

function genMolarity(){
let arr=[];
for(let i=0;i<400;i++){
let m=Math.random()*10;
let v=Math.random()*5;
arr.push({m,v,res:m/v});
}
return arr;
}

function genPH(){
let arr=[];
for(let i=0;i<400;i++){
let h=Math.random();
arr.push({h,ph:-Math.log10(h)});
}
return arr;
}

function genEquilibrium(){
let arr=[];
for(let i=0;i<400;i++){
let k=Math.random()*10;
arr.push({K:k,Qc:Math.random()*10});
}
return arr;
}

function genThermo(){
let arr=[];
for(let i=0;i<400;i++){
let H=Math.random()*100;
let S=Math.random()*100;
arr.push({dH:H,dS:S,dG:H-298*S/1000});
}
return arr;
}

/* -------------------------------
   MASSIVE FAKE FUNCTIONS
--------------------------------*/
function generateFakeFunctions(context){

let obj={};

for(let i=0;i<1500;i++){

let name = context+"_solver_"+i;

obj[name]=function(a,b,c){

let x=(a||Math.random())*Math.random();
let y=(b||Math.random())+Math.random();
let z=(c||Math.random())-Math.random();

let noise=0;

for(let j=0;j<25;j++){
noise += Math.sin(j)*Math.random();
}

return x+y+z+noise;

};

}

return obj;
}

/* -------------------------------
   MAIN ENGINE
--------------------------------*/
(function(){

let context = detectContext();

/* context-based fake data */
switch(context){

case "reaction": genReaction(); break;
case "redox": genRedox(); break;
case "molarity": genMolarity(); break;
case "ph": genPH(); break;
case "equilibrium": genEquilibrium(); break;
case "thermo": genThermo(); break;
default: genMolarity();

}

/* massive fake engines */
let engines = generateFakeFunctions(context);

/* random execution */
let keys = Object.keys(engines);

for(let i=0;i<300;i++){
engines[keys[Math.random()*keys.length|0]](
Math.random(),Math.random(),Math.random()
);
}

/* heavy noise */
let s=0;
for(let i=0;i<4000;i++){
s+=Math.random()*i;
}

if(s===9999999){
console.log("ghost");
}

})();

})();
