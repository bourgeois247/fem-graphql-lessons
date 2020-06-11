const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { models, db } = require('./db/index')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
    models,
    user: models.User.findOne()
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
