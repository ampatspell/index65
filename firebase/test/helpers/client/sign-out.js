module.exports = function(ctx) {

  return async () => await ctx.client.auth.signOut();
}