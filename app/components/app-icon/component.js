import Component from '@ember/component';
import { computed } from '@ember/object';

const mapping = {
  'log-out':       'ion-log-out',
  'roles':         'ion-happy-outline',
  'collection':    'ion-ios-box-outline',
  'box':           'ion-ios-filing-outline',
  'medium':        'ion-ios-film-outline',
  'admin':         'ion-ios-gear-outline',
  'chevron-left':  'ion-chevron-left',
  'chevron-right': 'ion-chevron-right',
  'compose':       'ion-compose',
  'more':          'ion-more',
  'back':          'ion-ios-arrow-back',
  'year':          'ion-ios-clock-outline',
  'upload':        'ion-upload',
  'error':         'ion-close-circled'
};

export default Component.extend({
  classNameBindings: [':app-icon', ':ion', 'mappedName', 'action:action:no-action'],
  tagName: 'i',

  name: null,

  click() {
    this.action && this.action();
  },

  mappedName: computed('name', function() {
    let name = this.name;
    if(!name) {
      return;
    }
    let mapped = mapping[name];
    return mapped || name;
  }).readOnly()

});
