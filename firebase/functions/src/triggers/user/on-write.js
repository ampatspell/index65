export default app => app.functions.firestore.document('users/{uid}').onWrite(async (change, context) => {
  let { after } = change;

  let roles = [];

  if(after.exists) {
    roles = after.data().roles || [];
  }

  let uid = after.ref.id;

  console.log('claims', uid, roles);

  app.info(`${uid}: update auth claims: ${roles}`);

  await app.auth.setCustomUserClaims(uid, { roles });
});
