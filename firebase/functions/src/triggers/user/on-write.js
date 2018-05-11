export default app => app.functions.firestore.document('users/{uid}').onWrite(async (change, context) => {
  let { after } = change;

  let roles = [];

  if(after.exists) {
    roles = after.data().roles || [];
  }

  let uid = after.ref.id;

  app.info('update auth claims', uid, roles);

  await app.auth.setCustomUserClaims(uid, { roles });
});
