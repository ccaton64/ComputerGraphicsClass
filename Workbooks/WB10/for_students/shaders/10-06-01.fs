/* a simple procedural texture */
/* the student should change this to implement a checkerboard */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;
    float c = mod(floor(x) + floor(y), 2.0);
    float d = max(abs(fract(x) - 0.5), abs(fract(y) - 0.5));
    float a = smoothstep(0.5 - fwidth(d), 0.5, d) / 2.0;
    gl_FragColor = mix(vec4(c, c, c, 1.0), vec4(1.0 - c, 1.0 - c, 1.0 - c, 1.0), a);
}
