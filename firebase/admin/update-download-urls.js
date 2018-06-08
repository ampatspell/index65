let serviceAccount = require('./index65-prod-firebase-adminsdk-qcjza-21dd271e8f.json');
let app = require('./make-app')(serviceAccount, {
  storageBucket: "index65-prod.appspot.com"
});

let uuid = require('uuid/v4');
let promiseLimit = require('promise-limit');

let limit = promiseLimit(25);

let firestore = app.firestore();
let bucket = app.storage().bucket();

const getToken = async file => {
  let [ root ] = await file.getMetadata();
  let metadata = root.metadata;
  if(!metadata) {
    metadata = {};
    root.metadata = metadata;
  }
  let tokens = metadata.firebaseStorageDownloadTokens;
  if(!tokens) {
    tokens = uuid();
    metadata.firebaseStorageDownloadTokens = tokens;
    await file.setMetadata(root);
  }
  return tokens.split(',')[0];
}

const updateImage = async (source, collection, group, image) => limit(async () => {
  let data = image.data();
  if(!data.storage) {
    return;
  }

  let basePath = `images/${source.id}/${collection.id}/${group.id}/${image.id}`;

  await Promise.all(Object.keys(data.storage).map(async key => {
    if(data.storage[key].url.startsWith('https://firebasestorage')) {
      console.log('skip', image.ref.path, key);
      return;
    }
    let file = bucket.file(`${basePath}/${key.split('x')[0]}`);
    let token = await getToken(file);
    let url = `https://firebasestorage.googleapis.com/v0/b/${file.bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${token}`;
    data.storage[key].url = url;
  }));

  await image.ref.set(data);
  console.log('done', image.ref.path);
});

const updateGroup = async (source, collection, group) => {
  let snapshot = await group.ref.collection('images').get();
  return Promise.all(snapshot.docs.map(doc => updateImage(source, collection, group, doc)));
}

const updateCollection = async (source, collection) => {
  let snapshot = await collection.ref.collection('groups').get();
  return Promise.all(snapshot.docs.map(doc => updateGroup(source, collection, doc)));
}

const updateSource = async source => {
  let snapshot = await source.ref.collection('collections').get();
  return Promise.all(snapshot.docs.map(doc => updateCollection(source, doc)));
}

const updateSources = async () => {
  let snapshot = await firestore.collection('sources').get();
  return Promise.all(snapshot.docs.map(doc => updateSource(doc)));
}

const run = async () => {
  await updateSources();
};

run().then(() => {
  console.log('done')
}, err => {
  console.log(err.stack);
});
