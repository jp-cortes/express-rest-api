const { ApolloServer } = require('@apollo/server');
// Playground in @apollo/server
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')
const { expressMiddleware } = require('@apollo/server/express4');
const { loadFiles } = require('@graphql-tools/load-files');
const { buildContex } = require('graphql-passport')


const resolvers = require('./resolvers');

 const useGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs:  await loadFiles('./api/**/*.graphql'),
    resolvers,
    context: ({ req, res }) => buildContex({ req, res }),
    playground: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault
    ]
  });

  await server.start();

  app.use(expressMiddleware(server, {
    context: async ({req}) => ({
      token: req.headers.token
    })
  }))

}

module.exports = useGraphQL;
