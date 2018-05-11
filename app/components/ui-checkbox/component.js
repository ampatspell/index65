import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'input',
  attributeBindings: [ 'type', 'checked' ],

  type: 'checkbox',

  value: null,
  checked: readOnly('value'),

  change(e) {
    this.update && this.update(e.target.checked);
  }

});
