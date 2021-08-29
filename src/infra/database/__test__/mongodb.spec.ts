import connection from '../mongodb';
import { v4 } from 'uuid';
describe('shold be connect to database', () => {
  let tags;
  let client;
  let sampleDB;
  beforeAll(async () => {
    client = await connection();
    sampleDB = client.db('sample');
    tags = sampleDB.collection('tags');
  });
  afterAll(async () => {
    sampleDB.dropDatabase();
  });
  test('create a single record', async () => {
    const records = ['test', 'hashtag', 'mySystm', 'MongoDBRocks'].map(
      (item) => ({
        uuid: v4(),
        hashtag: item,
      })
    );
    const result = await tags.insertOne(records[0]);
    expect(result.acknowledged).toBeTruthy();
  });

  test('create a many records', async () => {
    const records = ['test', 'hashtag', 'mySystm', 'MongoDBRocks'].map(
      (item) => ({
        uuid: v4(),
        hashtag: item,
      })
    );
    const result = await tags.insertMany(records.slice(1));
    expect(result.acknowledged).toBeTruthy();
  });
});
