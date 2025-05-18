/* a simple procedural texture: dots */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the dots */
uniform vec3 light;
uniform vec3 dark;

const vec3 blue = vec3(0.2, 0.2, 0.7);
const vec3 green = vec3(0.2, 0.7, 0.2);

/* number of dots over the UV range */
uniform float dots;

/* how big are the circles */
uniform float radius;

void main()
{
    float x = v_uv.x * dots;
    float y = v_uv.y * dots;

    float xc = floor(x);
    float yc = floor(y);

    float even = mod(xc+yc,2.0);
    vec3 dotColor = mix(blue,green, even);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    float dc = step(d,radius);

    gl_FragColor = vec4(mix(light,dotColor,dc), 1.);
}

