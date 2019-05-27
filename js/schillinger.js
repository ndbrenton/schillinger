/*
 * ******* MODEL ********
 */
let a = 3;  // Major Generator
let b = 2;  // Minor Generator
let r = [];  // resultant as array of integers
let cp = (a * b);  // Common Product
let cd = (1 / cp); // Common Denominator

let cdArr = [];  // console.log(cdArr);
let aArr = [];
let bArr = [];
let rArr = [];
let rSorted = [];
let rArrFractions = [];  // resultant array for numbers (fractions) area
let cpArr = [];

let cw = 180; // Canvas width
let ch = 60;  // Canvas height
let hi = ch * (1/4); // Upper limit for graph line
let lo = ch * (3/4); // Lower limit for graph line
let y = lo;

let quarter = 4;
let eighth = 8;
let oneBeat = eighth;
let bars = 'T';
let divisions = 't';
let timeSignature = '';

/* Set up the Number (fractions) area */
const num_cd = document.querySelector('#num-cd'); // cd
const num_a  = document.querySelector('#num-a'); // a
const num_b  = document.querySelector('#num-b'); // b
const num_r  = document.querySelector("#num-r"); // r
const num_cp = document.querySelector('#num-cp'); // cp

/* Set up the Graphs area */
const graphcd = document.getElementById('cd-graph');
canvascd = document.createElement('canvas');
canvascd.id = 'canvas-cd';
const ctxcd = canvascd.getContext('2d')
graphcd.appendChild(canvascd);

const grapha = document.getElementById('a-graph');
canvasa = document.createElement('canvas');
canvasa.id = 'canvas-a';
const ctxa = canvasa.getContext('2d');
grapha.appendChild(canvasa);

const graphb = document.getElementById('b-graph');
canvasb = document.createElement('canvas');
canvasb.id = 'canvas-b';
const ctxb = canvasb.getContext('2d');
graphb.appendChild(canvasb);

const graphr = document.getElementById('r-graph');
canvasr = document.createElement('canvas');
canvasr.id = 'canvas-r';
const ctxr = canvasr.getContext('2d');
graphr.appendChild(canvasr);

const graphcp = document.getElementById('cp-graph');
canvascp = document.createElement('canvas');
canvascp.id = 'canvas-cp';
const ctxcp = canvascp.getContext('2d')
graphcp.appendChild(canvascp);

const groupingBy_cp = document.getElementById('grouping-cp');
const groupingBy_a = document.getElementById('grouping-a');
const groupingBy_b = document.getElementById('grouping-b');


const resultant = document.getElementById('select-r'); // the resultant's select menu
resultant.addEventListener('change', function() {
    a = resultant.value.charAt(0)  // the first character of value attribute
    b = resultant.value.charAt(1)  // the second character of value attribute
    cp = (a * b);  // Common Product
    cd = (1 / cp); // Common Denominator
    cw = 180;

    octopus();
})


/*
 ******** OCTOPUS "Control" ********
 */
function octopus() {

    findcd();
    findGenerator(a, aArr, num_a);
    findGenerator(b, bArr, num_b);
    findcp();

/* Graph first then find resultant */
    drawGraphs();
    findr();

/* Console Logs for feedback */
    console.clear();
    console.log(`${a} % ${b}`);
    console.log(`c.d. = ${cd}`)
    console.log(`  a. = ${a}`)
    console.log(`  b. = ${b}`)
    console.log(`  r. = ${r}`)
    console.log(`c.p. = ${cp}`);

cpGrouping();
aGrouping();
bGrouping();

//    console.log(`${timeSignature}, ${bars} bars with ${divisions} units per measure.`);
//    console.log(`${timeSignature}, ${bars} bars with ${divisions} units per measure.`);
//    console.log(`${timeSignature}, ${bars}T with ${divisions}t per measure.`);

}
octopus();


/*
 ******** VIEW ********
 */

/* Number (fraction) related functions */
function findcd() {
    cdArr = [];  // clear the array
    for (i = 1; i <= cp; i++) {
        cdArr.push(`<sup>1</sup>/<sub>${cp}</sub>`);
    }
    num_cd.innerHTML = cdArr.join('  +  '); // add fractions to html
}

function findGenerator(generator, genArray, numbersForGenerator) {
    genArray = []; // clear the array
    if (generator == cp) {  // if a == common product, do only once
        genArray.push(`<sup>${generator}</sup>/<sub>${cp}</sub>`);  // add fraction to generator's array
    } else {
        for (i = 0; i < 0.999999;) {  // add generator to itself for another pass
            i = i + (generator / cp); // add fraction to generator's array
            genArray.push(`<sup>${generator}</sup>/<sub>${cp}</sub>`);
        }
    }
    numbersForGenerator.innerHTML = genArray.join('  +  ');
}

function findr() {
    num_r.innerHTML = rArrFractions.join('  +  ');
}

function findcp() {
    cpArr = [];
    if (cp <= 18) {
        cpArr.push(`<sup>${cp}</sup>/<sub>${cp}</sub>`);
    } else {
        cpArr.push(`over eighteen! . . . <sup>${cp}</sup>/<sub>${cp}</sub>`);
    }
    num_cp.innerHTML = cpArr.join('  +  ');
}

/* Graph-related Functions */
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

function endGraph(canvas, generator) {
    if (generator) {
        rArr.push(cw);
    }
    switchY();
    canvas.lineTo(cw,y);  // down
    canvas.stroke();  // stroke path to render
    resetY();
}

function drawGraphs() {
// c.d. (common denominator)
    setupGraph(canvascd, ctxcd);
    for (i = 0; i < cp; i++) {
        switchY();
        x1 = cw * ( i / cp);
        x2 = cw * ((i + 1) / cp); // console.log(`t${t}: ${x1},${y} and ${x2},${y}`)
        ctxcd.lineTo(x1,y);
        ctxcd.lineTo(x2,y);
    }
    endGraph(ctxcd);
// a. (major generator)
    setupGraph(canvasa, ctxa);
    for (i = 0; (i * a) < cp; i++) {
        switchY();
        x1 = cw * ( (i      * a) / cp);
        x2 = cw * (((i + 1) * a) / cp); // console.log(`t${i}: ${x1},${y} and ${x2},${y}`)
        ctxa.lineTo(x1,y);
        ctxa.lineTo(x2,y);
        rArr.push(x1);  // add into resultant array for comparison ***
    }
    endGraph(ctxa, 'a');
// b. (minor generator)
    setupGraph(canvasb, ctxb);
    for (i = 0; (i * b) < cp; i++) {
        switchY();
        x1 = cw * ( (i      * b) / cp);
        x2 = cw * (((i + 1) * b) / cp); //  console.log(`t${i}+1: ${x1},${y} and ${x2},${y}`)
        ctxb.lineTo(x1,y);
        ctxb.lineTo(x2,y);
        rArr.push(x1);  // add into resultant array for comparison ***
    }
    endGraph(ctxb, 'b');
// r. (resultant)
    setupGraph(canvasr, ctxr);
    var rUnique = rArr.filter(function(x, index){ // removes duplicate pushes from above (a and b graphing)
    	return rArr.indexOf(x) >= index;
    });
    rSorted = rUnique.sort((a, b) => a - b); // sorts array by index
    for (i = 1; i < rSorted.length; i++) { // for loop to draw resultant, utilizing sorted array for x coordinates
        switchY();
        x1 = rSorted[i-1];
        x2 = rSorted[i];
        ctxr.lineTo(x1,y);
        ctxr.lineTo(x2,y); // console.log(`${x1},${y} and ${x2},${y}`);
    }
    endGraph(ctxr);
/* *** *** magic part start *** *** */
    rArr = [];
    r = [];
    rArrFractions = [];
    for (i = 0; i < rSorted.length - 1; i++) { // obtains values for resultant in decimal form
        xDiff = rSorted[i + 1] - rSorted[i]  // (x2 - x1)
        rDecimal = xDiff / cw; // in decimal form // console.log(rDecimal);
        rDecRounded = Math.round(rDecimal * cp);  // numerator for resultant fractions // console.log(`${rDecRounded} / ${cp}`);
        rArrFractions.push(`<sup>${rDecRounded}</sup>/<sub>${cp}</sub>`); // pushes into resultant array for numbers section
        r.push(rDecRounded); // pushes into resultant integer array for console loggins and eventually music notation***
    }
/* *** *** magic part end *** *** */
// c.p. (common product)
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

/* Music notation functions to follow */


/* Grouping functions */
function cpGrouping() {
    if (b != 1) {
        oneBeat = eighth;
        bars = (a*b)/(a*b);
        divisions = a*b;
        if (a <= 4 && cp != 12 && cp != 6) {
            oneBeat = quarter;
        }
        timeSignature = `${divisions}/${oneBeat}`;
        if (a*b <= 18) {
            groupingBy_cp.innerText = `${bars} bar of ${timeSignature}, with ${divisions} units per measure.`;
        } else {
    //        console.log(`---  ${cp} greater than 18.`);
            groupingBy_cp.innerText = `N/A: c.p. over 18.`;
        }
    } else {
            groupingBy_cp.innerText = `N/A`;
    }
}

function aGrouping() {
    oneBeat = eighth;
    bars = (a*b)/(a);
    divisions = a;
    if (b <= 4 && a != 7) {
        oneBeat = 4;
    }
    if (a >= 8 ) {
        oneBeat = 8;
    }
    timeSignature = `${divisions}/${oneBeat}`;
    groupingBy_a.innerText = `${bars} bars of ${timeSignature}, with ${divisions} units per measure.`;
}

function bGrouping() {
    if (b != 1) {
        oneBeat = eighth;
        bars = (a*b)/(b);
        divisions = b;
        if (b <= 5) { // 7%6 can also be 3/4
            oneBeat = 4;
        }
        timeSignature = `${divisions}/${oneBeat}`;
        groupingBy_b.innerText = `${bars} bars of ${timeSignature}, with ${divisions} units per measure.`;
    } else {
        groupingBy_b.innerText = `N/A`;
    }
}
