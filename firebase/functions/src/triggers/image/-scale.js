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
    expires: '01-01-2500'
  });
  return url;
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

    let destination = path.join(path.dirname(original.name), `${size}`);

    let [ file ] = await bucket.upload(tmp, {
      destination,
      metadata: {
        contentType: 'image/jpg'
      }
    });

    await rm(tmp);

    response[`${size}x${size}`] = await getURL(file);
  }));

  await rm(original.tmp);

  response.original = await getURL(original.file);

  return response;
}