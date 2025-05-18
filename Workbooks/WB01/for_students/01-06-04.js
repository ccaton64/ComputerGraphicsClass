let text1 = document.getElementById("ex3-span");
let lasttime;
let value = 0;
let r = 255;
let g = 0;
let b = 0;
let goingUp = true;

function changeColor(timestamp) {
    if (! (lasttime === undefined)) {
        text1.style.backgroundColor = `rgb(${r},${g},${b})`;
        const delta = (timestamp - lasttime) / 40.0;
        if(goingUp){
            g+= 1;
            b+= 1;

            //if timer done goingUp false
            value = (value + delta);
            if(value >= 100){
                goingUp = false;
            }
        }
        else{
            g-= 1;
            b-= 1;

            //if timer done goingUp true
            value = (value - delta);
            if(value <= 0){
                goingUp = true;
            }
        }
    }

    lasttime = timestamp
    window.requestAnimationFrame(changeColor);
}

window.requestAnimationFrame(changeColor);