const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGO_URI } = require("./config");

const pubSub = new PubSub();

// Connect to apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub }),
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server started on port:${res.url} ☘️`));
