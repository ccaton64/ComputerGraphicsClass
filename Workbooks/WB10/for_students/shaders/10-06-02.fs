/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the pattern */
uniform vec3 green;
uniform vec3 blue;
uniform vec3 red;
uniform vec3 white;
uniform vec3 blueGreen;

uniform float squares;
uniform float thickness;

void main()
{
    float rx = floor(v_uv.x * squares);
    float ry = floor(v_uv.y * squares);
    vec2 square_uv = fract(v_uv * squares);

    // Check parity (0.0 = odd, 1.0 = even)
    float rowEven = 1.0 - mod(ry, 2.0);
    float colEven = 1.0 - mod(rx, 2.0);

    vec3 color;

    //if even row alternate between green and blueGreen
    if (rowEven == 1.0) {
        // If col is odd use blueGreen, if col is even use green
        color = mix(blueGreen, green, colEven);
    }
    //if odd row alternate between blueGreen and blue
    else {
        // If col is odd use blue, if col is even use blueGreen
        color = mix(blue, blueGreen, colEven);
    }

    float halfThick = thickness / 2.0;

    // Check if is near the center lines
    bool onVLine = abs(square_uv.x - 0.5) < halfThick;
    bool onHLine = abs(square_uv.y - 0.5) < halfThick;

    // Determine line colors based on even
    vec3 HLineColor = mix(red, white, rowEven);
    vec3 VLineColor = mix(red, white, colEven);

    // Overlay lines on top of the squares
    if (onVLine) {
        color = VLineColor;
    }
    // Horizontal lines overwrite vertical lines at the intersection
    if (onHLine) {
        color = HLineColor;
    }

    gl_FragColor = vec4(color, 1.0);


}

