import "reflect-metadata";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import resolvers from "./graphql/resolvers";

const port = 3000;
const app = express();

app.use(express.json({ limit: "50mb" }));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})