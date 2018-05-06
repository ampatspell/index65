module.exports = function(ctx) {

  return async () => await ctx.auth.signOut();
};
