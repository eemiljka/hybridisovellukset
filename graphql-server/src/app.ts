require('dotenv').config();
import express, {Request, Response} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {notFound, errorHandler} from './middlewares';
import {MessageResponse} from '@sharedTypes/MessageTypes';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'
import {loadFilesSync} from '@graphql-tools/load-files';
import typeDefs from './api/schemas/index';
import resolvers from './api/resolvers/index';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

const app = express();

(async () => {
  try {
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
      }),
    );

    app.get('/', (_req: Request, res: Response<MessageResponse>) => {
      res.send({message: 'Server is running'});
    });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
      ApolloServerPluginLandingPageLocalDefault()],
    });

await server.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(server));

    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.error((error as Error).message);
  }
})();

export default app;
