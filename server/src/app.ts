import "reflect-metadata";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./user/user-resolver";
import Container from "typedi";

createConnection('local').then(async (connection) => {

  const port = 3000;
  const app = express();

  app.use(express.json({ limit: "50mb" }));

  const schema = await buildSchema({
    resolvers: [UserResolver],
    container: Container,
  });
  
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));
  
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })

});