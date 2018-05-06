import { computed } from '@ember/object';

export const model = (name, props) => computed(function() {
  return this.models.model(name, props);
}).readOnly();