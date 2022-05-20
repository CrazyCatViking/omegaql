import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { Server } from 'http';
import { GraphQLSchema } from 'graphql';
import { wsContext } from './context';

export const useWebSockets = (
  server: Server,
  schema: GraphQLSchema,
  execute: any,
  subscribe: any,
) => {
  const wsServer = new ws.Server({
    server,
    path: '/subscriptions',
  });

  useServer({ 
    schema,
    execute,
    subscribe,
    context: (data) => wsContext(
      data.extra.request,
      data.extra.socket,
      data.connectionParams
    ),
  }, wsServer);
};


