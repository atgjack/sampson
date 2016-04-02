/* @flow */
const LIST_LIMIT = 600;
const LIST_SCALE = .5;

export default function quickselect(array: Array, k: number, begin: ?number, end: ?number): number {
  let list = array.slice(0);
  if (list.length == 0 || k >= list.length) return NaN;
  let left = begin || 0;
  let right = end || list.length - 1;
  if (left == right) return list[left];
  else {
    while (right > left) {
      if (right - left > LIST_LIMIT) {
        let n = right - left + 1;
        let m = k - left + 1;
        let z = Math.log(n);
        let s = LIST_SCALE * Math.exp(2 * z / 3);
        let sd = LIST_SCALE * Math.sqrt(z * s * (n - s) / n);
        let newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
        let newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
        quickselect(list, k , newLeft, newRight);
      }
      let t = list[k];
      let i = left;
      let j = right;
      swap(list, i, k);
      if (list[j] > t) swap(list, i, j);
      while (i < j) {
        swap(list, i, j)
        i++;
        j--;
        while (list[i] < t) i++;
        while (list[j] > t) j--;
      };
      if (list[left] === t) swap(list, left, j)
      else {
        j++;
        swap(list, j, right);
      };
      if (j > k) { right = j - 1 }
      else {
        left = j + 1;
        right = j - 1;
      };
    };
    return list[k];
  };
};

function swap(list: Array, i: number, j: number): void {
  let temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}
