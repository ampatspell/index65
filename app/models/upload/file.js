import Model from '../model';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { typeOf } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Model.extend({

  store: service(),

  file: null,
  name: readOnly('file.name'),

  group: null,
  image: null,

  isUploading: false,
  isUploaded: false,
  isError: false,
  error: null,

  isValid: computed('group', 'image', function() {
    let { group, image } = this;
    return typeOf(group) === 'number' && typeOf(image) === 'number';
  }).readOnly(),

  init() {
    this._super(...arguments);
    let name = this.file.name;
    let [ filename, extension ] = name.split('.');
    let [ prefix, group, image ] = filename.split('-');
    this.setProperties({
      group: parseInt(group),
      image: parseInt(image)
    });
  },

  upload() {
    this.setProperties({
      isUploading: true,
      isError: false,
      error: null
    });

    let { batch, file, group, image } = this;
    let { source, collection } = batch;

    let path = `images/${source.ref.id}/${collection.ref.id}/${group}/${image}/original`;

    let task = this.store.storage.ref(path).put({
      type: 'data',
      data: file,
      metadata: {
        contentType: file.type
      }
    });

    return task.promise.then(() => {
      this.setProperties({
        isUploading: false,
        isUploaded: true
      });
    }, err => {
      this.setProperties({
        isUploading: false,
        isError: true,
        error: err
      });
    });
  }

});