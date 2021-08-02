import Item from '../../core/entity/Item';
import { ItemObjectParams } from '../../adapters/Item';
import PaginationEntity from '../../shared/utils/PaginationEntity';
import { PaginationEntityOptionsObjectParams } from '../../adapters/PaginationEntity';

export default interface ItemRepository {
  createItem(item: ItemObjectParams): Promise<Item | null>;
  find(id: string): Promise<Item>;
  findByStorage(id: string): Promise<Item[]>;
  findWithNotIn(
    ids: string[],
    { limit, after }: PaginationEntityOptionsObjectParams
  ): Promise<PaginationEntity<Item>>;
}
