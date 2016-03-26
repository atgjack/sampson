/* @flow */
export function factorial(n: number): number {
  if (n < 0) return -1
  else if (n == 0) return 1
  else return (n * factorial( n - 1 ));
};

export function sterling(n: number): number {
  let n2 = n * n;
  return (13860 - (462 - (132 - (90 - 140 / n2) / n2) / n2) / n2) / n / 166320;
};


export let BINOM_TABLE = [
  [1],
  [1,1],
  [1,2,1],
  [1,3,3,1],
  [1,4,6,4,1]
];


// https://pomax.github.io/bezierinfo/


export function choose(n: number, k: number) {
  if (k > n) throw new Error('k cannot be greater than n.');
  function addBinomial() {
    let s: number = BINOM_TABLE.length;
    let nextRow: array = [];
    nextRow[0] = 1;
    let prev = s - 1;
    for (let i = 1; i <= prev; i++) {
      nextRow[i] = BINOM_TABLE[prev][i-1] + BINOM_TABLE[prev][i];
    };
    nextRow[s] = 1;
    BINOM_TABLE.push(nextRow)
  };
  while(n >= BINOM_TABLE.length) {
    addBinomial()
  };
  return BINOM_TABLE[n][k];
};
