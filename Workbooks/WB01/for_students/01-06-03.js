let slider = document.getElementById("slider");
let lasttime;
let value = 0;
let isForward = true;

function advanceSlider(timestamp) {
    if (! (lasttime === undefined)) {
        if(isForward){
            const delta = (timestamp - lasttime) / 20.0;
            value = (value + delta);
            slider.value = value.toString();
            if(value >= 100){
                isForward = false;
            }
        } else {
            const delta = (timestamp - lasttime) / 20.0;
            value = (value - delta);
            slider.value = value.toString();
            if(value <= 0){
                isForward = true;
            }
        }
    }

    lasttime = timestamp
    window.requestAnimationFrame(advanceSlider);
}

window.requestAnimationFrame(advanceSlider);