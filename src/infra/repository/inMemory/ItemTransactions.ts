import Item from '../../../core/entity/Item';
import Transaction, { TransactionEnum } from '../../../core/entity/Transaction';
import ITemTrasactionsInterface from '../ItemTrasactions';
import InMemoryDb from './inMemory';
import { transactions } from './__fake__/index';

export default class ItemTrasactionsInMemoryRepository
  extends InMemoryDb<Transaction>
  implements ITemTrasactionsInterface
{
  constructor(list: Transaction[] = []) {
    super([...transactions, ...list]);
  }
  async createTransaction(transaction: Transaction): Promise<Transaction> {
    this.store.push(transaction);
    return Promise.resolve(transaction);
  }
  async lastTrasactionState(item: Item): Promise<Transaction> {
    const data = this.store
      .filter((i: Transaction) => item.id === i.item.id && TransactionEnum.Loan === i.status)
      .sort((a: Transaction, b: Transaction) => a.createdAt.getTime() - b.createdAt.getTime());

    return Promise.resolve(data?.[0]);
  }
}
