import Storage from "../../../core/entity/Storage";
import StorageRepository from "../StorageRepository";
import InMemoryDb from "./inMemory";

export default class StorageRepositoryInMemory
  extends InMemoryDb<Storage>
  implements StorageRepository
{
  updateStorage(storage: Storage): Promise<Storage> {
    this.store.filter((item) => storage.id == item.id);
    storage.updateEntity();
    this.store.push(storage);
    return Promise.resolve(storage);
  }
  createStorage(storage: Storage): Promise<Storage> {
    this.store.push(storage);
    return Promise.resolve(storage);
  }
  find({ name, id }: Storage): Promise<Storage[]> {
    return Promise.resolve(
      this.store.filter((item) => item.name === name || item.id === id)
    );
  }
}
