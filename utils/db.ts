import { MongoClient } from 'mongodb';

// Extender la interfaz Global para incluir _mongoClientPromise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/llakascriptbooking';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, reutiliza la conexión entre hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, crea una nueva conexión
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;