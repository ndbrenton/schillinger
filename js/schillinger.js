/* MODEL */
let a = 3;  // Major Generator
let b = 1;  // Minor Generator
let r = 'tbd';
let cp = (a * b);  // Common Product
let cd = (1 / cp); // Common Denominator

let cdArr = [];  // console.log(cdArr);
let aArr = [];
let bArr = [];
let rArr = [];
let cpArr = [];

const cw = 120; // Canvas width
const ch = 60;  // Canvas size
let hi = ch * (1/4); // Upper limit for graph line
let lo = ch * (3/4); // Lower limit for graph line
let y = lo;

const num_cd = document.querySelector('#num-cd'); // cd
const num_a = document.querySelector('#num-a'); // a
const num_b = document.querySelector('#num-b'); // b
const num_r = document.querySelector("#num-r"); // r
const num_cp = document.querySelector('#num-cp'); // cp

const canvascd = document.querySelector('#canvas-cd');
const ctxcd = canvascd.getContext('2d')
const canvasa =  document.querySelector('#canvas-a');
const ctxa = canvasa.getContext('2d');
const canvasb =  document.querySelector('#canvas-b');
const ctxb = canvasb.getContext('2d');
const canvasr =  document.querySelector('#canvas-r');
const ctxr = canvasr.getContext('2d');
const canvascp = document.querySelector('#canvas-cp');
const ctxcp = canvascp.getContext('2d');


const majorGeneratorSelector = document.getElementById('select-a');
const minorGeneratorSelector = document.getElementById('select-b');



/* OCTOPUS */
function octopus() {





    console.log('calculating numbers');
    cdArr = [];
    aArr = [];
    rArr = [];
    cpArr = [];

    findcd();
    num_cd.innerHTML = cdArr.join('  +  ');
    finda(a,cp,aArr);
    num_a.innerHTML = aArr.join('  +  ');
    findb(b, cp, bArr);
    num_b.innerHTML = bArr.join('  +  ');
    findr();
    num_r.innerText = 'TBD';
    findcp();
    num_cp.innerHTML = cpArr.join('  +  ');

    drawGraphs();
}
octopus();

majorGeneratorSelector.addEventListener('change', function() { // When a new 'a' is selected
    a = majorGeneratorSelector.value;
    bArr = [];
    cp = (a * b);  // Common Product
    cd = (1 / cp); // Common Denominator
    octopus();
})
minorGeneratorSelector.addEventListener('change', function() { // When a new 'b' is selected
    b = minorGeneratorSelector.value;  // Minor Generator
    bArr = [];
    cp = (a * b);  // Common Product
    cd = (1 / cp); // Common Denominator
    octopus();
})


/* VIEW */
function findcd() {
    for (i = 1; i <= cp; i++) {
        cdArr.push(`<sup>1</sup>/<sub>${cp}</sub>`);
    }
    console.log(`cd: ${cd}`)
}
function finda() {  // a, cp, aArr
    if (a == cp) {  // if a is same as common product
        aArr.push(`<sup>${a}</sup>/<sub>${cp}</sub>`);  // do only once
        console.log('if only...');
    } else {
        for (i = 0; i < 1;) {  // add a to itself for another pass
            i = i + (a / cp);
            aArr.push(`<sup>${a}</sup>/<sub>${cp}</sub>`);
        }
    }
    console.log(`a: ${a}`)
}
function findb() {
    for (i = 0; i < 0.999999;) {
        i = i + (b / cp);
        bArr.push(`<sup>${b}</sup>/<sub>${cp}</sub>`);
    }
    console.log(`b: ${b}`)
}
function findr() {
//    console.log('TBD calculating fractions for resultant.');
//    console.log(`r: ${r}`)
}
function findcp() {
    if (cp <= 15) {
        cpArr.push(`<sup>${cp}</sup>/<sub>${cp}</sub>`);
    } else {
        cpArr.push('over fifteen');
    }
    console.log(`cp: ${cp}`);
}


function switchY() {  // inverts the value of y
    if (y === lo) {
        y = hi; // console.log(`y is lo, switching to: ${y}`);
    } else {
        y = lo; // console.log(`y is hi, switching to: ${y}`);
    }
}
function resetY() {  // sets y to lo
    if (y === lo) { //  console.log('Y is already lo');
    } else {
        y = lo; //  console.log('Y is now lo');
    }
}

function setupGraph(canvas, ctx) {
    canvas.width = cw;  // set canvas width
    canvas.height = ch; // set canvas height
    ctx.beginPath();    // create the path
    ctx.moveTo(0,y);    // set starting point position
}

function drawGraphs() {
// common denominator
    setupGraph(canvascd, ctxcd);
    for (i = 0; i < cp; i++) {
        switchY();
        x1 = cw * ( i / cp);
        x2 = cw * ((i + 1) / cp); // console.log(`t${t}: ${x1},${y} and ${x2},${y}`)
        ctxcd.lineTo(x1,y);
        ctxcd.lineTo(x2,y);
    }
    endGraph(ctxcd);
// a
    setupGraph(canvasa, ctxa);
    for (i = 0; (i * a) < cp; i++) {
        switchY();
        x1 = cw * ( (i      * a) / cp);
        x2 = cw * (((i + 1) * a) / cp); // console.log(`t${i}: ${x1},${y} and ${x2},${y}`)
        ctxa.lineTo(x1,y);
        ctxa.lineTo(x2,y);
        rArr.push(x1);
    }
    endGraph(ctxa, 'a');
// b
    setupGraph(canvasb, ctxb);
    for (i = 0; (i * b) < cp; i++) {
        switchY();
        x1 = cw * ( (i      * b) / cp);
        x2 = cw * (((i + 1) * b) / cp); //  console.log(`t${i}+1: ${x1},${y} and ${x2},${y}`)
        ctxb.lineTo(x1,y);
        ctxb.lineTo(x2,y);
        rArr.push(x1);
    }
    endGraph(ctxb, 'b');
// resultant
    setupGraph(canvasr, ctxr);
    var rUnique = rArr.filter(function(item, index){ // remove duplicates
    	return rArr.indexOf(item) >= index;
    }); // console.log(rUnique);
    rSorted = rUnique.sort((a, b) => a - b); // console.log(rSorted);
    for (i = 1; i < rSorted.length; i++) { // for loop to draw resultant
        switchY();
        x1 = rSorted[i-1];
        x2 = rSorted[i];
        ctxr.lineTo(x1,y);
        ctxr.lineTo(x2,y); // console.log(`${x1},${y} and ${x2},${y}`);
    }
    endGraph(ctxr);
// common product
    setupGraph(canvascp, ctxcp);
    for (i = 0; (i * cp) < cp; i++) {
        switchY();
        x1 = cw * ( i / cp);
        x2 = cw * (((i + 1) * cp) / cp); // console.log(`t${i}+1: ${x1},${y} and ${x2},${y}`)
        ctxcp.lineTo(x1,y);
        ctxcp.lineTo(x2,y);
    }
    endGraph(ctxcp);
} // end drawGraphs();

function endGraph(canvas, generator) {
    if (generator) {
        rArr.push(cw);
    }
    switchY();
    canvas.lineTo(cw,y);  // down
    canvas.stroke();  // stroke path to render
    resetY();
}
