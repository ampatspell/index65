import Model from '../model';
import { filterBy } from '@ember/object/computed';
import batch from 'index65/util/batch';

export default Model.extend({

  source: null,
  collection: null,

  files: null,
  pending: filterBy('files', 'isPending', true),
  valid: filterBy('files', 'isValid', true),
  uploaded: filterBy('files', 'isUploaded', true),

  update(files) {
    let models = this.models;
    files = files.map(file => models.create('upload/file', { batch: this, file }));
    this.set('files', files);
  },

  upload() {
    let files = this.pending.filter(file => !file.isUploading);
    let start = new Date();
    return batch(files, 50, file => file.upload()).then(() => {
      let end = new Date();
      this.set('took', (end - start) / 1000);
    });
  }

});
