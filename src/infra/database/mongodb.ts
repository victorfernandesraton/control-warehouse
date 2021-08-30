import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    await this.connect(this.uri);

    return this.client.db().collection(name);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async drop() {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri);
    }
    this.client.db().dropDatabase();
  },

  map: (data: any): any => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id };
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map((c) => MongoHelper.map(c));
  },
};
