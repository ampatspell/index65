import chunk from './chunk';
import { all, resolve } from 'rsvp';

export default (array, len, fn) => {
  let chunks = chunk(array, len);
  return chunks.reduce((promise, chunk) => {
    return promise.then(() => all(chunk.map(item => fn(item))));
  }, resolve());
}