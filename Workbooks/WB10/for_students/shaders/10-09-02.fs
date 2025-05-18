/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
uniform sampler2D tex;
varying vec3 v_xyz_world;
varying vec3 v_xyz_local;
varying vec3 v_normal;

const vec3 lightDir = vec3(0,0,1);
const vec3 baseColor = vec3(0.3,.2,.4);

void main()
{
    vec3 nhat = normalize(v_normal);
    float light = abs(dot(nhat, lightDir));

    gl_FragColor = texture2D(tex, v_uv) + vec4(light * baseColor,1);
}

