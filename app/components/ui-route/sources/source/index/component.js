import Component from '@ember/component';
import { model } from 'index65/util/model';

export default Component.extend({

  actions: {
    collection(doc) {
      console.log(doc+'');
    }
  }

});
