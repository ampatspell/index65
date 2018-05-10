import path from 'path';
import { file as tempy } from 'tempy';
import { unlink } from 'fs';
import sharp from 'sharp';

const rm = path => new Promise((resolve, reject) => {
  unlink(path, err => {
    if(err) {
      return reject(err);
    }
    return resolve();
  });
});

const isImage = object => object.contentType.startsWith('image/');

const download = async (bucket, name) => {
  let file = tempy();
  await bucket.file(name).download({ destination: file });
  return file;
};

const scale = async (input, w, h) => {
  let file = tempy();
  await sharp(input).resize(w, h).max().toFormat('jpeg').toFile(file);
  return file;
};

const upload = (bucket, name, filename) => {
  return bucket.upload(filename, {
    destination: name,
    metadata: {
      contentType: 'image/jpg'
    }
  });
};

const isOriginal = name => {
  let [ images, source, collection, group, image, original ] = name.split('/');
  return images === 'images' && original === 'original';
};

const sizes = [
  [ '1024x1024', 1024, 1024 ],
  [ '200x200',   200,  200  ],
];

export default app => app.functions.storage.object().onFinalize(async object => {
  let name = object.name;

  if(!isImage(object) || !isOriginal(name)) {
    return;
  }

  let bucket = app.storage.bucket(object.bucket);
  let original = await download(bucket, name);

  let thumbnails = await Promise.all(sizes.map(async ([ thumb, w, h ]) => {
    let scaled = await scale(original, w, h);
    let full = path.join(path.dirname(name), thumb);
    await upload(bucket, full, scaled);
    await rm(scaled);
  }));

  await rm(original);
});