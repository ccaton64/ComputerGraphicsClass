let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let slr1 = document.getElementById("slr1");
let speed = 0;

if (!(startButton instanceof HTMLInputElement))
    throw new Error("Expected startButton - but didn't get one");
if (!(stopButton instanceof HTMLInputElement))
    throw new Error("Expected stopButton - but didn't get one");
if (!(slr1 instanceof HTMLInputElement))
    throw new Error("Expected slr1 - but didn't get one");

startButton.onclick = function() {
    speed = 1;
}

stopButton.onclick = function() {
    speed = 0;
}

function advanceSLR1() {
    let newValue = (Number(slr1.value)+speed) % 100;
    if (newValue<0) newValue=100;
    slr1.value = newValue.toString();
    window.requestAnimationFrame(advanceSLR1);
}
advanceSLR1();