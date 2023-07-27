const { ApolloServer } = require('@apollo/server');
// Playground in @apollo/server
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')

const { expressMiddleware } = require('@apollo/server/express4');

const typeDefs =  `
type Query {
  hi: String
  getPerson(name: String, age: Int): String
  getInt(age: Int): Int
  getFloat(price: Float): Float
  getString: String
  getBoolean: Boolean
  getId: ID
  getNumbers(numbers: [Int!]!): [Int]
}
`;
//  the "!" exclamation point make the type mandatory & not null
// Get - Query
// POST, PUT, DELET = Mutations
// POST = 201
// POST = CREATE = 201
// GET = GET DATA
// PUT = Update
// DELETE = remove

// List
// [String]
// [Int]


 const resolvers = {
  Query: {
    hi: () => 'hello there',
    getPerson: (_, args) => `Hello, my name is ${args.name}, I am ${args.age} years old.`,
    getInt: (_, args) => args.age ,
    getFloat: (_, args) => args.price,
    getString: () => 'word',
    getBoolean: () => true,
    getId: () => '2324654',
  }
 }

 const useGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs,
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
