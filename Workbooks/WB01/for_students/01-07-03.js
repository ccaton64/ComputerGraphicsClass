let text = document.getElementById("ex3-span");
let redButton = document.getElementById("redButton");
let greenButton = document.getElementById("greenButton");
let yellowButton = document.getElementById("yellowButton");

let r = 255;
let g = 255;
let b = 255;

function resetColor(){
    text.style.backgroundColor = `rgb(${r},${g},${b})`;
    if(r<255){
        r+=2;
    }
    if(g<255){
        g+=2;
    }
    if(b<255){
        b+=2;
    }
    if(r>255) r=255;
    if(g>255) g=255;
    if(b>255) b=255;

    if(b<255 || r<255 || g<255){
        window.requestAnimationFrame(resetColor);
    }
    else{
        //pick random color
        let random = Math.floor(Math.random()*3);
        if(random==0){
            text.textContent = "some text that will become RED";
            window.requestAnimationFrame(goingRed);
        }
        else if(random==1){
            text.textContent = "some text that will become GREEN";
            window.requestAnimationFrame(goingGreen);
        }
        else{
            text.textContent = "some text that will become YELLOW";
            window.requestAnimationFrame(goingYellow);
        }
    }
}

//If random gets a 0, go red, if 1 go green, if 2 go yellow
function goingRed(){
    text.style.backgroundColor = `rgb(${r},${g},${b})`;

    if(r!=255){
        r+=1;
    }
    if(g!=0){
        g-=1;
    }
    if(b!=0){
        b-=1;
    }
    if(b!=0 || r!=255 || g!=0){
        window.requestAnimationFrame(goingRed);
    }
    else{
        window.requestAnimationFrame(resetColor);
    }
}

function goingGreen(){
    text.style.backgroundColor = `rgb(${r},${g},${b})`;

    if(r!=0){
        r-=1;
    }
    if(g!=255){
        g+=1;
    }
    if(b!=0){
        b-=1;
    }
    if(b!=0 || r!=0 || g!=255){
        window.requestAnimationFrame(goingGreen);
    }
    else{
        window.requestAnimationFrame(resetColor);
    }
}

function goingYellow(){
    text.style.backgroundColor = `rgb(${r},${g},${b})`;

    if(r!=255){
        r+=1;
    }
    if(g!=255){
        g+=1;
    }
    if(b!=0){
        b-=1;
    }
    if(b!=0 || r!=255 || g!=255){
        window.requestAnimationFrame(goingYellow);
    }    
    else{
        window.requestAnimationFrame(resetColor);
    }
}

window.requestAnimationFrame(resetColor);