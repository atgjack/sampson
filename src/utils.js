/* @flow */
export function factorial(n: number): number {
  if (n < 0) return -1
  else if (n == 0) return 1
  else return (n * factorial( n - 1 ));
};

export function sterling(n: number): number {
  return (n + .5) * Math.log(n) - n + Math.log(2 * Math.PI) / 2;
};

// http://blog.plover.com/math/choose.html

export function choose(n: number, k: number) {
  if (k > n) throw new Error('k cannot be greater than n.');
  let r: number = 1;
  for (let d = 1; d <= k; d++) {
    r *= n--;
    r /= d;
  }
  return r
};

// https://github.com/substack/gamma.js/blob/master/index.js

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

export function gamma(input: number): number {
  let z: number = input;
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z))
  } else if (z > 100) {
    Math.exp(lngamma(z))
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

export function lngamma(z: number): number {
  if (z < 0 ) return Number('0/0');
  let x: number = GAMMA_TABLE_LN[0];
  for (let i = GAMMA_TABLE_LN.length - 1; i > 0; --i) x += GAMMA_TABLE_LN[i] / (z + i);
  let t: number = z + GAMMA_NUM_LN + .5;
  return .5 * Math.log(2 * Math.PI) + (z + .5) * Math.log(t) - t + Math.log(x) - Math.log(z);
}
