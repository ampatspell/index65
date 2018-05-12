import scale from './-scale';
import onFinalize from './-on-finalize';

export default app => onFinalize(app, 'images/{source}/{collection}/{group}/{image}/original', async (object, match) => {
  let name = object.name;
  let bucket = object.bucket;

  let { source, collection, group, image } = match;

  group = parseInt(group);
  image = parseInt(image);

  //

  let scaled = await scale(app, {
    original: {
      bucket,
      name
    },
    sizes: [ 1024, 200 ]
  });

  //

  let groupRef = app.firestore.doc(`sources/${source}/collections/${collection}/groups/${group}`);
  let imageRef = app.firestore.doc(`sources/${source}/collections/${collection}/groups/${group}/images/${image}`);

  await Promise.all([
    groupRef.set({ identifier: group }, { merge: true }),
    imageRef.set({ identifier: image, storage: scaled }, { merge: true })
  ]);
});