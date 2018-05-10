import Component from '@ember/component';
import { model } from 'index65/util/model';

export default Component.extend({

  batch: model({
    name: 'upload/batch',
    props() {
      return this.getProperties('source', 'collection');
    }
  }),

  actions: {
    files(files) {
      this.batch.update(files);
    },
    upload() {
      this.batch.upload();
    }
  }

});
