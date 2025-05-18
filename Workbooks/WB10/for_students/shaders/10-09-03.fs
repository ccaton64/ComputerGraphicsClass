//#extension GL_OES_standard_derivatives : enable

varying vec3 vPos;
varying vec2 vUv;
uniform float time;
uniform vec3 color;

uniform float checks;

float line(float width, vec2 step){
      
      vec2 coord = vUv / step;

      vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord * width * checks);
      float line = min(grid.x, grid.y);
      
      return 1. - min(line, 1.0);
    }

void main() {
      float v = line(1., vec2(1. / 30., 0.1));
      
      float s = 500.; // step
      float mp = mod(vPos.z - time * 100., s);
      float smoth = 1. - smoothstep(0., 5., mp) * (1. - smoothstep(s - 20.,s,mp));
      
      vec3 c = v * vec3(0., 1., 1.) * smoth;
      c = mix(color, c, v);
      
      gl_FragColor = vec4(c, 1.0);
    }

