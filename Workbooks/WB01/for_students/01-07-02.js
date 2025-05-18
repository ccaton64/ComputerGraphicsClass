let text1 = document.getElementById("ex3-span");
let redButton = document.getElementById("redButton");
let greenButton = document.getElementById("greenButton");
let yellowButton = document.getElementById("yellowButton");

let r = 255;
let g = 255;
let b = 255;

redButton.onclick = function(){
    text1.textContent = "some text that will become RED"
    window.requestAnimationFrame(goingRed);
}

function goingRed(){
    text1.style.backgroundColor = `rgb(${r},${g},${b})`;

    if(r!=255){
        r+=.5;
    }
    if(g!=0){
        g-=.5;
    }
    if(b!=0){
        b-=.5;
    }
    if(b!=0 || r!=255 || g!=0){
        window.requestAnimationFrame(goingRed);
    }
}

greenButton.onclick = function(){
    text1.textContent = "some text that will become GREEN"
    window.requestAnimationFrame(goingGreen);
}

function goingGreen(){
    text1.style.backgroundColor = `rgb(${r},${g},${b})`;

    if(r!=0){
        r-=.5;
    }
    if(g!=255){
        g+=.5;
    }
    if(b!=0){
        b-=.5;
    }
    if(b!=0 || r!=0 || g!=255){
        window.requestAnimationFrame(goingGreen);
    }
}

yellowButton.onclick = function(){
    text1.textContent = "some text that will become YELLOW"
    window.requestAnimationFrame(goingYellow);
}

function goingYellow(){
    text1.style.backgroundColor = `rgb(${r},${g},${b})`;

    if(r!=255){
        r+=.5;
    }
    if(g!=255){
        g+=.5;
    }
    if(b!=0){
        b-=.5;
    }
    if(b!=0 || r!=255 || g!=255){
        window.requestAnimationFrame(goingYellow);
    }
}
