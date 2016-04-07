/* @flow */
const GAMMA_NUM_LN: number = 607/128;
const GAMMA_TABLE_LN: array = [
  0.99999999999999709182,
  57.156235665862923517,
  -59.597960355475491248,
  14.136097974741747174,
  -0.49191381609762019978,
  0.33994649984811888699e-4,
  0.46523628927048575665e-4,
  -0.98374475304879564677e-4,
  0.15808870322491248884e-3,
  -0.21026444172410488319e-3,
  0.21743961811521264320e-3,
  -0.16431810653676389022e-3,
  0.84418223983852743293e-4,
  -0.26190838401581408670e-4,
  0.36899182659531622704e-5
];

/**
 * The log-gamma function is a useful general function.
 * It can handle much larger numbers because it grows much slower compared to the gamma function.
 * It's (n - 1)! and is used by the gamma function for n > 100.
 * [See](https://en.wikipedia.org/wiki/Gamma_function#The_log-gamma_function)
 * @param {number} n - The number.
 * @return {number} An approximation of ln(n-1)! or NaN if n < 0.
 */
 // Code kanged from: [gamma.js](https://github.com/substack/gamma.js/blob/master/index.js)
export default function lngamma(z: number): number {
  if (z < 0 ) return NaN;
  let x: number = GAMMA_TABLE_LN[0];
  for (let i = GAMMA_TABLE_LN.length - 1; i > 0; --i) x += GAMMA_TABLE_LN[i] / (z + i);
  let t: number = z + GAMMA_NUM_LN + .5;
  return .5 * Math.log(2 * Math.PI) + (z + .5) * Math.log(t) - t + Math.log(x) - Math.log(z);
};
