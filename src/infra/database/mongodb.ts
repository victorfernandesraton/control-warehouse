import { MongoClient } from 'mongodb';

export default function () {
  const uri = 'mongodb://localhost:27017/?readPreference=primary&ssl=false';
  try {
    const client = new MongoClient(uri).connect();

    return Promise.resolve(client);
  } catch (error) {
    return Promise.reject(error);
  }
}
