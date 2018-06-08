import uuid from 'uuid/v4';

const key = 'firebaseStorageDownloadTokens';

const toArray = string => {
  if(!string) {
    return [];
  }
  return string.split(',');
}

const toString = array => {
  return array.join(',');
}

const tokenFromMetadata = metadata => {
  let tokens = toArray(metadata[key]);
  return tokens[0];
}

const addTokenToMetadata = (metadata, token) => {
  let tokens = toArray(metadata[key]);
  tokens.push(token);
  metadata[key] = toString(tokens);
}

export const getDownloadURL = async file => {
  let [ root ] = await file.getMetadata();

  let metadata = root.metadata;

  if(!metadata) {
    metadata = {};
    root.metadata = metadata;
  }

  let token = tokenFromMetadata(metadata);

  if(!token) {
    token = uuid();
    addTokenToMetadata(metadata, token);
    await file.setMetadata(root);
  }

  let bucket = file.bucket.name;
  let name = encodeURIComponent(file.name);

  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${name}?alt=media&token=${token}`;
}
