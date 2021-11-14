import { Db, MongoClient } from 'mongodb';

let client: MongoClient;
let db: Db;

export const mongoDbConnect = async () => {
  client = new MongoClient(process.env.MONGO_CONNECTION_STRING);
  await client.connect();
  db = client.db(process.env.MONGOBD_NAME);

  console.log('Connected to database');
}

export const getConnection = () => {
  if (!db) throw new Error('Attempted to get connection before connecting to database');

  return db;
}

export const close = () => { client?.close(); }