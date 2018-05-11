export default app => app.functions.auth.user().onCreate(async user => {

  let { uid, email, displayName } = user;
  let created_at = new Date();
  let roles = [];

  let path = `users/${uid}`;

  app.info(`${uid}: create document`);

  await app.firestore.doc(path).set({ email, displayName, created_at, roles });
});
