import Model from '../model';
import { all } from 'rsvp';

export default Model.extend({

  source: null,
  collection: null,

  files: null,

  update(files) {
    let models = this.models;
    files = files.map(file => models.create('upload/file', { batch: this, file }));
    this.set('files', files);
  },

  upload() {
    let files = this.files.filter(file => !file.isUploading && !file.isUploaded && file.isValid);
    let start = new Date();
    return all(files.map(file => file.upload())).then(() => {
      let end = new Date();
      console.log('Uploaded', files.length, ', took', (end-start) / 1000, 'seconds');
    });
  }

});