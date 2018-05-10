import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  tagName: 'img',
  attributeBindings: [ 'src', 'style' ],

  width: null,
  height: null,
  src: null,

  style: computed('width', 'height', function() {
    let { width, height } = this;
    if(!width || !height) {
      return;
    }
    return htmlSafe(`width: ${parseInt(width)}px; height: ${parseInt(height)}px`);
  }).readOnly(),

});
