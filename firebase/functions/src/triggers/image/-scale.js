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

const getURL = async file => {
  let [ url  ] = await file.getSignedUrl({
    action: 'read',
    expires: '2500-01-01'
  });
  return url;
}

const getSize = async tmp => {
  let meta = await sharp(tmp).metadata();
  let { width, height } = meta;
  return { width, height };
}

// {
//   original: { bucket, name },
//   sizes: [ 1024, 200 ]
// }
export default async (app, opts) => {
  let response = {};
  let bucket = app.storage.bucket(opts.original.bucket);

  let original = {
    name: opts.original.name,
    file: bucket.file(opts.original.name),
    tmp: tempy(),
  };

  await original.file.download({ destination: original.tmp });

  //

  await Promise.all(opts.sizes.map(async size => {

    let tmp = tempy();
    await sharp(original.tmp).resize(size, size).max().toFormat('jpeg').toFile(tmp);

    const upload = async () => {
      let destination = path.join(path.dirname(original.name), `${size}`);
      let [ file ] = await bucket.upload(tmp, {
        destination,
        metadata: {
          contentType: 'image/jpg',
          cacheControl: 'max-age=21600'
        }
      });
      return file;
    }

    let [ file, metadata ] = await Promise.all([
      upload(),
      getSize(tmp)
    ]);

    await rm(tmp);

    response[`${size}x${size}`] = {
      url:  await getURL(file),
      size: metadata
    };
  }));

  await Promise.all([
    getURL(original.file),
    getSize(original.tmp)
  ]).then(([ url, size ]) => response.original = { url, size });

  await rm(original.tmp);

  return response;
}
