import scale from './-scale';

const split = name => {
  let [ prefix, source, collection, group, image, filename ] = name.split('/');
  return { prefix, source, collection, group, image, filename };
};

const isImage = object => object.contentType.startsWith('image/');

export default app => app.functions.storage.object().onFinalize(async object => {
  let name = object.name;
  let bucket = object.bucket;

  if(!isImage(object)) {
    return;
  }

  let { prefix, source, collection, group, image, filename } = split(name);

  if(prefix !== 'images' || filename !== 'original') {
    return;
  }

  let scaled = await scale(app, { original: { bucket, name }, sizes: [ 1024, 200 ] });

  let createGroup = () => {
    let ref = app.firestore.doc(`sources/${source}/collections/${collection}/groups/${group}`);
    return ref.set({ identifier: parseInt(group) }, { merge: true });
  }

  let createImage = () => {
    return app.firestore.doc(`sources/${source}/collections/${collection}/groups/${group}/images/${image}`).update({
      identifier: parseInt(image),
      storage: scaled
    }, { merge: true });
  };

  await Promise.all([
    createGroup(),
    createImage()
  ]);
});