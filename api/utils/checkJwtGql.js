const boom = require('@hapi/boom');

async function checkJwtGql(context) {
  const { user } = await context.authenticate('jwt', { session: false });
  if (!user) {
    throw boom.unauthorized()
  }
}

module.exports = { checkJwtGql };
