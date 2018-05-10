import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const base = [
  { type: 'logo' },
  { type: 'authentication' }
];

export default Component.extend({
  classNameBindings: [':app-header'],

  breadcrumbs: service(),

  items: computed('breadcrumbs.models.[]', function() {
    let breadcrumbs = this.breadcrumbs.models || [];
    return [ ...base, ...breadcrumbs ];
  })

});