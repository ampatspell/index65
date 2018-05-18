import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { join } from '@ember/runloop';

export default Mixin.create({

  keyManager: service(),

  didInsertElement() {
    this._super(...arguments);

    let keyManager = this.keyManager;
    let create = (executionKey, action) => keyManager.addMacro({
      executionKey: executionKey,
      keyEvent: 'keydown',
      callback: () => join(() => this.send(action))
    });

    let left = create('arrowleft', 'previous');
    let right = create('arrowright', 'next');
    let esc = create('escape', 'escape');
    let enter = create('enter', 'enter');

    this._keyMacros = [ left, right, esc, enter ];
  },

  willDestroyElement() {
    this._super(...arguments);

    let keyManager = this.keyManager;
    this._keyMacros.map(macro => keyManager.removeMacro(macro));
  }

});
