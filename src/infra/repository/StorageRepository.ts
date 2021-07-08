import Storage from "../../core/entity/Storage";

export default interface StorageRepository {
  find(storage: Storage): Promise<Storage[] | null>;
  createStorage(storage: Storage): Promise<Storage | null>;
  updateStorage(storage: Storage): Promise<Storage | null>;
}