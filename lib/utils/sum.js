/* @flow */
// https://github.com/simple-statistics/simple-statistics/blob/master/src/sum.js
export default function sum(x: Array<number>): number {
  if ( x.length == 0) return 0;
  let errorComp = 0;
  return x.reduce( (p,n) => {
    let corrected = n - errorComp;
    let next = p + corrected;
    errorComp = next - p - corrected;
    return next;
  }, 0);
};
