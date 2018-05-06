import { computed } from '@ember/object';

export const model = (...args) => {
  let opts = args.pop();
  return computed(...args, function() {
    return this.models.model(opts.name, opts.props);
  }).readOnly();
}