import { helper } from '@ember/component/helper';

export function pad(params) {
  let [ value, len ] = params;

  value = `${value}`;
  if(value.length >= len) {
    return value;
  }

  let prefix = new Array(len - value.length + 1).join('0');
  return `${prefix}${value}`;
}

export default helper(pad);
