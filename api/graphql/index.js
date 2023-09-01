const { ApolloServer } = require('@apollo/server');
// Playground in @apollo/server
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')
const { expressMiddleware } = require('@apollo/server/express4');
const { loadFiles } = require('@graphql-tools/load-files');
const { buildContext } = require('graphql-passport');
const { typeDefs: scalarsTypeDefs, resolvers: scalarResolvers } = require('graphql-scalars');


const resolvers = require('./resolvers');

 async function useGraphQL(app) {
  const typeDefs = [
    ...await loadFiles('./api/**/*.graphql'),
    scalarsTypeDefs
  ];

  const allResolvers = [
    resolvers,
    scalarResolvers,
  ];

  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    // context: ({ req, res }) => buildContext({ req, res }),
    playground: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault
    ]
  });

  await server.start();

  app.use('/graphql',
    expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({
      req,
      res
      // token: req.headers.authorization
    })
  }))

}

module.exports = useGraphQL;
