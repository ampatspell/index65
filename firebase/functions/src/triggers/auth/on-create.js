export default app => app.functions.auth.user().onCreate(async user => {

  let { uid, email, displayName } = user;
  let createdAt = new Date();
  let roles = [];

  let path = `users/${uid}`;

  app.info('create document', path);

  await app.firestore.doc(path).set({ email, displayName, createdAt, roles });
});
