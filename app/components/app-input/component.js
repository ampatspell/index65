import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'input',

  attributeBindings: [
    'placeholder',
    'value',
    'autofocus',
    'spellcheck',
    'autocapitalize',
    'autocorrect',
    'type',
    'disabled'
  ],

  label: null,
  placeholder: readOnly('label'),
  value: null,
  autofocus: false,
  spellcheck: false,
  autocapitalize: 'off',
  autocorrect: 'off',
  type: 'text',
  disabled: false,

  input(e) {
    let value = e.target.value;
    this.update && this.update(value);
  }

});
