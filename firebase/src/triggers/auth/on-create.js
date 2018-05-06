export default app => app.functions.auth.user().onCreate(async user => {

  let { uid, email, displayName } = user;
  let created_at = new Date();
  let roles = [];

  await app.firestore.doc(`users/${uid}`).set({ email, displayName, created_at, roles });
});
