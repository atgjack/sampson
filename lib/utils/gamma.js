/* @flow */
// https://github.com/substack/gamma.js/blob/master/index.js
import lngamma from './lngamma'

const GAMMA_NUM: number = 7;
const GAMMA_TABLE: array =  [
  0.99999999999980993,
  676.5203681218851,
  -1259.1392167224028,
  771.32342877765313,
  -176.61502916214059,
  12.507343278686905,
  -0.13857109526572012,
  9.9843695780195716e-6,
  1.5056327351493116e-7
];

export default function gamma(input: number): number {
  let z: number = input;
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z))
  } else if (z > 100) {
    return Math.exp(lngamma(z))
  } else {
    z -= 1;
    let x: number = GAMMA_TABLE[0];
    for (let i = 1; i < GAMMA_NUM + 2; i++) {
      x += GAMMA_TABLE[i] / (z + i);
    };
    let t: number = z + GAMMA_NUM + .5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + .5) * Math.exp(-t) * x;
  };
};
