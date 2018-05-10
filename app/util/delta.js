import { computed } from '@ember/object';

export default (modelKey, arrayKey, value) => computed(modelKey, `${arrayKey}.[]`, function() {
  let model = this.get(modelKey);
  let array = this.get(arrayKey);

  if(!model || !array) {
    return;
  }

  let idx = array.indexOf(model);

  if(idx == -1) {
    return;
  }

  idx = idx + value;

  if(idx < 0 || idx > array.length) {
    return;
  }

  return array.objectAt(idx);
}).readOnly();
