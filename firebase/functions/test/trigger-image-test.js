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
      this.name = '/images/valdis/35mm/100/10/original';
      this.file = this.admin.bucket.file(this.name);
      this.upload = async () => this.file.save(await readFile('valdis-0106-010.jpg'), { contentType: 'image/jpg' });
    });

    it('scales image', async () => {
      await this.upload();
      let object = this.test.storage.makeObjectMetadata({
        name: this.name,
        contentType: 'image/jpg',
        bucket: this.admin.bucket.name
      });
      await this.onFinalize(object);
      assert.ok(true);
    });

  });

});