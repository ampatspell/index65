export default app => {

  const deleteFiles = files => Promise.all(files.map(async file => {
    try {
      await file.delete();
      app.info('delete image', file.name);
    } catch(err) {
      if(err.code === 404) {
        app.info('delete image', file.name, 'not-found');
      } else {
        app.info('delete image', file.name, 'error', err.message, err.code);
      }
    }
  }));

  return app.functions.firestore.document('sources/{source}/collections/{collection}/groups/{group}/images/{image}')
    .onDelete(async (snapshot, context) => {

      let { source, collection, group, image } = context.params;

      let data = snapshot.data();
      let names = Object.keys(data.storage || {});

      let bucket = app.bucket;
      let files = names.map(name => {
        let [ first ] = name.split('x');
        return bucket.file(`images/${source}/${collection}/${group}/${image}/${first}`);
      });

      await deleteFiles(files);
    });
}
