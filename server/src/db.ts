const { MongoClient, Db } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.CONNECTION_STRING;
const dbName = process.env.DB_NAME;

let db: typeof Db;

export async function connectToDatabase(): Promise<typeof Db> {
  if (db) return db;

  const client = await MongoClient.connect(uri);
  db = client.db(dbName);
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  return db;
}
