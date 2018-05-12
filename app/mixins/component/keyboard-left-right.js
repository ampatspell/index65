import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({

  keyManager: service(),

  didInsertElement() {
    this._super(...arguments);

    let keyManager = this.keyManager;
    let create = (executionKey, action) => keyManager.addMacro({
      executionKey: executionKey,
      keyEvent: 'keydown',
      callback: () => this.send(action)
    });

    let left = create('arrowleft', 'previous');
    let right = create('arrowright', 'next');
    let esc = create('escape', 'escape');

    this._keyMacros = [ left, right, esc ];
  },

  willDestroyElement() {
    this._super(...arguments);

    let keyManager = this.keyManager;
    this._keyMacros.map(macro => keyManager.removeMacro(macro));
  }

});