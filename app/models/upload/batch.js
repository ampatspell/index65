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
      let took = (end - start) / 1000;
      console.log(`Uploaded ${files.length} files, took ${took} seconds`);
    });
  }

});
