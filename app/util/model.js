import { computed } from '@ember/object';

export const model = (...args) => {
  let opts = args.pop();
  return computed(...args, function() {
    let props = opts.props;
    if(typeof props === 'function') {
      props = props.call(this);
    }
    return this.models.create(opts.name, props);
  }).readOnly();
}