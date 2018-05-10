const setup = require('./helpers/setup');
const assert = require('assert');

const readFile = name => new Promise((resolve, reject) => {
  const path = require('path');
  const fs = require('fs');
  fs.readFile(path.join(__dirname, '..', '..', 'files', name), (err, content) => {
    if(err) {
      return reject(err);
    }
    return resolve(content);
  });
});

describe('trigger / image', () => {
  setup(this);

  describe('onFinalize', () => {

    beforeEach(() => {
      this.onFinalize = this.test.wrap(this.app.triggers.image.onFinalize);
      this.ref = this.admin.firestore.doc('sources/valdis/collections/35mm/groups/100/images/10');
      this.name = 'images/valdis/35mm/100/10/original';
      this.file = this.admin.bucket.file(this.name);
      this.upload = async () => this.file.save(await readFile('valdis-0106-010.jpg'), { contentType: 'image/jpg' });
    });

    it('scales image', async () => {
      await this.ref.delete();
      await this.upload();
      let object = this.test.storage.makeObjectMetadata({
        name: this.name,
        contentType: 'image/jpg',
        bucket: this.admin.bucket.name
      });

      await this.onFinalize(object);

      let snapshot = await this.ref.get();
      let data = snapshot.data();

      const trimUrl = key => {
        data.storage[key].url = data.storage[key].url.substr(0, 26);
      };

      trimUrl('1024x1024');
      trimUrl('200x200');
      trimUrl('original');

      assert.deepEqual(data, {
        identifier: 10,
        storage: {
          '1024x1024': {
            url: 'https://storage.googleapis',
            size: { width: 714, height: 1024 }
          },
          original: {
            url: 'https://storage.googleapis',
            size: { height: 3623, width: 2527 }
          },
          '200x200': {
            url: 'https://storage.googleapis',
            size: { width: 139, height: 200 }
          }
        }
      });
    });

  });

});