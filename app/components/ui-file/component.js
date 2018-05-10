import Component from '@ember/component';
import { A } from '@ember/array';
import { equal } from '@ember/object/computed';

const toArray = files => {
  let arr = A();
  for(let i = 0; i < files.length; i++) {
    arr.push(files[i]);
  }
  return arr;
}

export default Component.extend({
  classNameBindings: [ ':ui-file' ],

  multiple: false,
  selection: null,

  isOneSelected: equal('selection.length', 1),

  actions: {
    onChange(e) {
      let files = toArray(e.target.files);
      let multiple = this.multiple;
      if(multiple) {
        if(files.length === 0) {
          return;
        }
        this._update(files);
      } else {
        let file = files[0];
        if(!file) {
          return;
        }
        this._update(file);
      }
      this.set('selection', files);
    }
  },

  _update(selection) {
    let update = this.get('update');
    update && update(selection);
  }

});
