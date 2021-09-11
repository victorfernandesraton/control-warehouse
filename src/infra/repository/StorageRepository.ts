import Storage from '../../core/entity/Storage';
import PaginationEntity from '../../shared/utils/PaginationEntity';

export default interface StorageRepository {
  find(id: string): Promise<Storage>;
  findAll(
    name?: string,
    afterAt?: number,
    limit?: number
  ): Promise<PaginationEntity<Storage>>;
  createStorage(storage: Storage): Promise<Storage | null>;
  updateStorage(storage: Storage): Promise<Storage | null>;
}
