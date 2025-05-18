let text1 = document.getElementById("ex3-span");
let r = 0;
let g = 255;
let b = 0;

function goingYellow(){
    text1.style.backgroundColor = `rgb(${r},${g},${b})`;
    r+=.5;
    if(r>=255){
        window.requestAnimationFrame(goingRed);
    } else{
        window.requestAnimationFrame(goingYellow);
    }
}

function goingGreen(){
    text1.style.backgroundColor = `rgb(${r},${g},${b})`;
    r-=.5;
    g+=.5;
    if(r<=0){
        window.requestAnimationFrame(goingYellow);
    } else{
        window.requestAnimationFrame(goingGreen);
    }
}

function goingRed(){
    text1.style.backgroundColor = `rgb(${r},${g},${b})`;
    g-=.5;
    if(g<=0){
        window.requestAnimationFrame(goingGreen);
    } else{
        window.requestAnimationFrame(goingRed);
    }
}

window.requestAnimationFrame(goingYellow);