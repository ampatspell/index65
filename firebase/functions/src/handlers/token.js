export default app => async (data, context) => {
  let auth = context.auth;

  if(!auth) {
    return {};
  }

  let {
    uid,
    token: {
      roles
    }
  } = context.auth;

  return {
    uid,
    roles
  };
}
