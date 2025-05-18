/* simplest possible fragment shader - just a constant color */
/* but a wrinkle: we pass the color from the javascript program in a uniform */
uniform vec3 color;

// We also passed in the time as a uniform (for bonus exercise)
uniform float time;

void main()
{
    //set color based on time and variabbles
    float redValue = (sin(time * 1.3) + 1.0) / 2.0;
    float greenValue = (cos(time * 0.6) + 1.0) / 2.0;

    //create the color
    vec3 color = vec3(redValue, greenValue, color.b);

    //set the color of the pixel to the new color
    gl_FragColor = vec4(color, 1.0);
}

