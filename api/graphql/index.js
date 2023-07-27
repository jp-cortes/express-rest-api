const { ApolloServer } = require('@apollo/server');
// Playground in @apollo/server
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')
const { expressMiddleware } = require('@apollo/server/express4');
const { loadFiles } = require('@graphql-tools/load-files');






 const resolvers = {
  Query: {
    hi: () => 'hello there',
    getPerson: (_, args) => `Hello, my name is ${args.name}, I am ${args.age} years old.`,
    getInt: (_, args) => args.age ,
    getFloat: (_, args) => args.price,
    getString: () => 'word',
    getBoolean: () => true,
    getId: () => '2324654',
    getProduct: () => {
      return {
        id:'321654',
        name: 'product 1',
        price: 102.90,
        description: 'bla bla bla',
        image: 'http://image.cloudinay.com',
        createdAt: new Date().toISOString()
      }
    }
  }
 }

 const useGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs:  await loadFiles('./api/**/*.graphql'),
    resolvers,
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
