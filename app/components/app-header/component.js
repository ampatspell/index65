import Component from '@ember/component';
import { computed } from '@ember/object';

const base = [
  { name: 'logo' },
  { name: 'authentication' }
];

export default Component.extend({
  classNameBindings: [':app-header'],

  breadcrumbs: null,

  items: computed('breadcrumbs.[]', function() {
    let breadcrumbs = this.breadcrumbs || [];
    return [ ...base, ...breadcrumbs ];
  })

});