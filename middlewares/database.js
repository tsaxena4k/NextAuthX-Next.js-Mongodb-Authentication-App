import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://MrDeathEater:TSmongonadb0000!@cluster0.hgcu4.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export async function setUpDb(db) {
  db.collection('users').createIndex({ email: 1 }, { unique: true });
}

export default async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("Authenticate");
  await setUpDb(req.db);
  return next();
}
