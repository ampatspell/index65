module.exports = function(ctx) {

  const mapping = {
    'admin': {
      email: 'admin@gmail.com',
      roles: [ 'admin' ]
    },
    'zeeba': {
      email: 'zeeba@gmail.com',
      roles: [ ]
    }
  };

  const password = 'hello-world';

  const signUp = async email => {
    try {
      return await ctx.client.auth.createUserWithEmailAndPassword(email, password);
    } catch(err) {
      if(err.code === 'auth/email-already-in-use') {
        return;
      }
      throw err;
    }
  };

  const signIn = async email => {
    return await ctx.client.auth.signInWithEmailAndPassword(email, password);
  };

  const insertDoc = async (uid, displayName, info) => {
    let { roles, email } = info;
    await ctx.admin.firestore.doc(`users/${uid}`).set({ email, displayName, roles });
  };

  return async name => {
    let info = mapping[name];
    let { email } = info;
    let user = await signUp(email);
    if(!user) {
      user = await signIn(email);
    }
    insertDoc(user.uid, name, info);
    return user;
  }
}