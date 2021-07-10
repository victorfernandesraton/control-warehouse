import Item from '../../../core/entity/Item';
import Transaction, { TransactionEnum } from '../../../core/entity/Transaction';
import User from '../../../core/entity/User';
import ITemTrasactionsInterface from '../ItemTrasactions';
import InMemoryDb from './inMemory';

export default class ItemTrasactionsInMemoryRepository
  extends InMemoryDb<Transaction>
  implements ITemTrasactionsInterface
{
  async createTransaction(transaction: Transaction): Promise<Transaction> {
    this.store.push(transaction);
    return Promise.resolve(transaction);
  }
  async lastTrasactionState(item: Item): Promise<Transaction> {
    const data = this.store
      .filter((i) => item.id === i.item.id)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return Promise.resolve(data?.[0]);
  }
}
