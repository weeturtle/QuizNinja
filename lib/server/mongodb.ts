import { MongoClient, Db } from 'mongodb';

// Extracts the database URL and name from the environment variables
const uri = process.env.MONGODB_URI as string || 'mongodb+srv://Admin:6YYdnG0bsprH3UXI@main.ueeb3.mongodb.net/?retryWrites=true&w=majority';
const dbName = process.env.MONGODB_DB as string || 'QuizNinja';

// If a connection has already been made, instead of 
// and having to wait for the connection to be made again
// reuse the previous connection
let cachedClient: MongoClient | null = null;
let cachedDb:Db | null = null;

// Validates that the database URL and name are not empty
if (!uri) {
  // If the database URL is empty, throw an error
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!dbName) {
  // If the database name is empty, throw an error
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

// Function used to establish a connection to the database
// and return a promise that resolves to the database object
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Creates a new MongoClient object
  const client = await MongoClient.connect(uri, {});

  // Gets the database object from the client
  const db = await client.db(dbName);

  // Sets the cachedClient and cachedDb variables to the client and db objects
  // This is so that the connection can be reused
  cachedClient = client;
  cachedDb = db;

  // Returns the client and db objects
  return { client, db };
}