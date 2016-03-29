/* @flow */
export default function sterling(n: number): number {
  return (n + .5) * Math.log(n) - n + Math.log(2 * Math.PI) / 2;
};
