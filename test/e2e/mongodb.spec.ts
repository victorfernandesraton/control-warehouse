import { MongoHelper } from '../../src/infra/database/mongodb';
import { v4 } from 'uuid';
describe('shold be connect to database', () => {
  beforeAll(async () => {
    const uri = 'mongodb://localhost:27017/?readPreference=primary&ssl=false';
    MongoHelper.connect(uri);
  });
  afterAll(async () => {
    MongoHelper.drop();
    MongoHelper.disconnect();
  });
  test('create a single record', async () => {
    const records = ['test', 'hashtag', 'mySystm', 'MongoDBRocks'].map(
      (item) => ({
        uuid: v4(),
        hashtag: item,
      })
    );
    const tags = await MongoHelper.getCollection('tags');
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
    const tags = await MongoHelper.getCollection('tags');

    const result = await tags.insertMany(records.slice(1));
    expect(result.acknowledged).toBeTruthy();
  });
});
