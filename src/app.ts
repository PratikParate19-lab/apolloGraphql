// import express from 'express';
import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { port } from './config/configuration';
import queryType from './index';
import traineeResolver from './module/trainee/query';
import userResolver from './module/user/query';
import { mergeResolvers } from 'merge-graphql-schemas';
import fs from 'fs';

fs.writeFileSync('./src/schema.graphql', queryType);

const allresolver = [traineeResolver, userResolver];

const resolvers = mergeResolvers(allresolver);

const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf-8');

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, 'my-secret-from-env-file-in-prod');
    }
    return null;
  } catch (err) {
    return null;
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || ' ';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);

    return {
      user
      // the generated prisma client if you are using it
    };
  }
});

server.listen(port, (err: any) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
