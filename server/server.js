import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./graphql/schema/schema.js";
import resolvers from "./graphql/resolvers/index.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import connectMongoose from "./db/index.js";

dotenv.config();
const port = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);

await connectMongoose();
// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

try {
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at ${port}`);
} catch (error) {
  console.log("Error", error.message);
  process.exit(1);
}
