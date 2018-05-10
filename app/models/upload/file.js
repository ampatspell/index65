import Model from '../model';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { typeOf } from '@ember/utils';
import { inject as service } from '@ember/service';

import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

const toInt = string => {
  let int = parseInt(string);
  if(isNaN(int)) {
    return;
  }
  return int;
};

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

  isPending: computed('isUploaded', 'isValid', function() {
    let { isUploaded, isValid } = this;
    return !isUploaded && isValid;
  }).readOnly(),

  init() {
    this._super(...arguments);
    let name = this.file.name;
    let [ filename, extension ] = name.split('.');
    let [ prefix, group, image ] = filename.split('-');
    this.setProperties({
      group: toInt(group),
      image: toInt(image)
    });
  },

  _upload() {
    let { batch, file, group, image } = this;
    let { source, collection } = batch;

    let path = `images/${source.ref.id}/${collection.ref.id}/${group}/${image}/original`;

    // let task = this.store.storage.ref(path).put({
    //   type: 'data',
    //   data: file,
    //   metadata: {
    //     contentType: file.type
    //   }
    // });
    //
    // return task.promise;

    return new Promise(resolve => {
      later(() => resolve(), Math.floor(Math.random() * 3000) + 1000);
    });
  },

  willUpload() {
    this.setProperties({
      isUploading: true,
      isError: false,
      error: null
    });
  },

  didUpload() {
    this.setProperties({
      isUploading: false,
      isUploaded: true
    });
  },

  uploadDidFail(err) {
    this.setProperties({
      isUploading: false,
      isError: true,
      error: err
    });
  },

  upload() {
    this.willUpload();
    return this._upload().then(() => this.didUpload(), err => this.uploadDidFail(err));
  }

});