// import express from 'express';
import { ApolloServer } from 'apollo-server';
// import jwt from 'jsonwebtoken';
import { port } from './config/configuration';
import queryType from './index';
import traineeResolver from './module/trainee/query';
import userResolver from './module/user/query';
import { mergeResolvers } from 'merge-graphql-schemas';
import fs from 'fs';
import UserAPI from './services/user/user';
fs.writeFileSync('./src/schema.graphql', queryType);

const allresolver = [traineeResolver, userResolver];

const resolvers = mergeResolvers(allresolver);

const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      userAPI: new UserAPI()
    };
  },
  context: ({ req }) => {
    return {
      token: 'test'
    };
  }
});

server.listen(port, (err: any) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
