import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { graphqlHTTP } from 'express-graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { mongoDbConnect } from './mongoClient';
import { makeSchema } from './schema';
import context from './context';

const PORT = process.env.OMEGAQL_PORT;

const app = express();
const schema = makeSchema();

const startServer = async () => {
  await mongoDbConnect();

  app.use(
    '/graphql',
    graphqlHTTP((req) => ({
      schema,
      context: context(req),
    })),
  );

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

    console.log('Server ready');
  });
}

startServer();