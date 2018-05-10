import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  classNameBindings: [ ':ui-image-background' ],
  attributeBindings: [ 'style' ],

  src: null,

  style: computed('src', function() {
    let src = this.src;
    if(!src) {
      return;
    }
    return htmlSafe(`background-image: url("${src}")`);
  }).readOnly()

});
