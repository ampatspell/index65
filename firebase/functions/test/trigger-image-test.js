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
        data.storage[key].url = data.storage[key].url.substr(0, 51);
      };

      trimUrl('1024x1024');
      trimUrl('200x200');
      trimUrl('original');

      assert.deepEqual(data, {
        identifier: 10,
        storage: {
          '1024x1024': {
            url: 'https://firebasestorage.googleapis.com/v0/b/index65',
            size: { width: 714, height: 1024 }
          },
          original: {
            url: 'https://firebasestorage.googleapis.com/v0/b/index65',
            size: { height: 3623, width: 2527 }
          },
          '200x200': {
            url: 'https://firebasestorage.googleapis.com/v0/b/index65',
            size: { width: 139, height: 200 }
          }
        }
      });
    });

  });

  describe('onDelete', () => {

    beforeEach(() => {
      this.upload = async name => {
        name = `images/valdis/35mm/100/10/${name}`;
        let file = this.admin.bucket.file(name);
        await file.save(`${name} content`, { contentType: 'text/plain' });
      };
      this.insert = () => Promise.all([
        this.upload('original'),
        this.upload('1024'),
        this.upload('200')
      ]);

      this.snapshot = () => this.test.firestore.makeDocumentSnapshot({
        storage: {
          '1024x1024': {},
          '200x200': {},
          'original': {}
        }
      }, 'sources/valdis/collections/35mm/groups/100/images/10');

      this.onDelete = this.test.wrap(this.app.triggers.image.onDelete);

      this.file = name => this.admin.bucket.file(`images/valdis/35mm/100/10/${name}`);
      this.exists = async name => {
        let [ exists ] = await this.file(name).exists();
        return exists;
      };
      this.allExists = async => Promise.all([ 'original', '200', '1024' ].map(async name => {
        let exists = await this.exists(name);
        return { exists, name };
      }));
    });

    it('deletes original and scaled images', async () => {
      await this.insert();
      assert.deepEqual(await this.allExists(), [
        { exists: true, name: 'original' },
        { exists: true, name: '200' },
        { exists: true, name: '1024' }
      ]);

      let snapshot = this.snapshot();
      await this.onDelete(snapshot, {
        params: {
          source: 'valdis',
          collection: '35mm',
          group: '100',
          image: '10'
        }
      });

      assert.deepEqual(await this.allExists(), [
        { exists: false, name: 'original' },
        { exists: false, name: '200' },
        { exists: false, name: '1024' }
      ]);
    });

    it('ignores missing files', async () => {
      await this.insert();
      await this.file('200').delete();

      assert.deepEqual(await this.allExists(), [
        { exists: true, name: 'original' },
        { exists: false, name: '200' },
        { exists: true, name: '1024' }
      ]);

      let snapshot = this.snapshot();
      await this.onDelete(snapshot, {
        params: {
          source: 'valdis',
          collection: '35mm',
          group: '100',
          image: '10'
        }
      });

      assert.deepEqual(await this.allExists(), [
        { exists: false, name: 'original' },
        { exists: false, name: '200' },
        { exists: false, name: '1024' }
      ]);
    });

  });

});
