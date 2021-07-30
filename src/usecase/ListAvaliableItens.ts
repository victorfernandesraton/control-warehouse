import Item from '../core/entity/Item';
import PaginationEntity from '../shared/utils/PaginationEntity';
import PaginationEntityAdapter from '../adapters/PaginationEntity';
import ItemTrasactionsRepository from '../infra/repository/ItemTrasactionsRepository';
import ItemRepository from '../infra/repository/ItemRepository';

export default class ListAvaliableItens {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly transactionRepository: ItemTrasactionsRepository
  ) {}

  async execute(limit = 5, afterAt?: string): Promise<PaginationEntity<Item>> {
    const tarnsactionsLoan = await this.transactionRepository.itensInLoan();
    const item = await this.itemRepository.findWithNotIn(
      tarnsactionsLoan.map((transaction) => transaction.item.id)
    );
    return Promise.resolve(
      PaginationEntityAdapter.create(item, {
        limit,
        after: afterAt,
      })
    );
  }
}
