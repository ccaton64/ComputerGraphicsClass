/*
 * Simple Shader
 * The student should make this more interesting, but the interesting parts
 * might be the fragment shader.
  */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;
varying vec3 v_xyz_world;
varying vec3 v_xyz_local;
varying vec3 v_normal;

/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    // pass the texture coordinate to the fragment
    v_uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    v_xyz_local = position;
    v_xyz_world = (modelMatrix * vec4( position, 1.0 )).xyz;
    v_normal = normalMatrix * normal;
}

