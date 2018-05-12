import { get } from '@ember/object';
import { A } from '@ember/array';

// https://stackoverflow.com/a/11764168
export default (arr, len) => {
  let chunks = A();
  let i = 0;
  let n = get(arr, 'length');
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}