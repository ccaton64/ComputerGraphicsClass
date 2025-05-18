let slider1 = document.getElementById("slider1");
let slider2 = document.getElementById("slider2");
let slider3 = document.getElementById("slider3");
let slider3Temp = 0;

if (!(slider1 instanceof HTMLInputElement))
    throw new Error("Expected Slider1 - but didn't get one");
if (!(slider2 instanceof HTMLInputElement))
    throw new Error("Expected Slider2 - but didn't get one");
if (!(slider3 instanceof HTMLInputElement))
    throw new Error("Expected Slider3 - but didn't get one");

slider1.onchange = function() {
    slider3.value = slider2.value - slider1.value;
};

slider2.onchange = function() {
    slider3.value = slider2.value - slider1.value;
};

slider3.onchange = function() {
    let newValue = parseInt(slider3.value);
    if (newValue > slider3Temp) {
        slider2.value = slider3.value + slider1.value;
    } else if (newValue < slider3Temp) {
        slider1.value = slider2.value - slider3.value;
    }
    slider3Temp = newValue;
};