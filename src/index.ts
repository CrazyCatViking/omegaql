import express from 'express';
import cors from 'cors';
import expressPlayground from 'graphql-playground-middleware-express';
import { graphqlHTTP } from 'express-graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { mongoDbConnect } from './mongoClient';
import { makeSchema } from './schema';
import context from './context';
import { redisConnect } from './cache';
import { twitchConnect } from './twitch';

const PORT = process.env.OMEGAQL_PORT;
const BASE_URL = `www.${process.env.DOMAIN_NAME}`

const app = express();
const schema = makeSchema();

const startServer = async () => {
  await mongoDbConnect();
  await redisConnect();
  await twitchConnect();

  app.use(
    '/graphql',
    graphqlHTTP(async (req, res) => ({
      schema,
      context: await context(req, res),
    })),
  );

  app.use(
    cors({
      origin: BASE_URL,
      credentials: true,
    }),
  )

  app.get('/', expressPlayground({ endpoint: '/graphql' }));

  const ws = createServer(app);

  ws.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server: ws,
      path: '/subscriptions',
    });

    console.log(`Server ready on port: ${PORT}`);
  });
}

startServer();