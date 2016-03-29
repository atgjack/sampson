/* @flow */
export default function sumNthPowerDev(x: Array<number>, n: number) {
  let mu: number = mean(x);
  return x.reduce( (p,next) => {
    return p + Math.pow(next - mu, n);
  }, 0);
};
