import Transaction, { TransactionEnum } from '../../../core/entity/Transaction';
import ItemTrasactionsRepository from '../ItemTrasactionsRepository';
import { ItemObjectParams } from '../../../adapters/Item';
import TransactionAdapter from '../../../adapters/Transaction';
import { UserObjectParams } from '../../../adapters/User';
import { data } from './__mocks__/ItemTransactions.json';
export default class ItemTransactionRepositoryInMemory
  implements ItemTrasactionsRepository
{
  data: any[] = [data[0]];

  createTransaction(
    item: ItemObjectParams,
    status: TransactionEnum,
    user: UserObjectParams
  ): Promise<Transaction> {
    const transaction = TransactionAdapter.create({ item, status, user });
    this.data.push(transaction);
    return Promise.resolve(transaction);
  }
  lastTrasaction(id: string): Promise<Transaction> {
    const data = this.data.filter((transaction) => transaction.item.id === id);
    const last = data.sort((a, b) => a.createdAt - b.createdAt)?.[0];
    return Promise.resolve(last);
  }
  async loanTransactionsByUser(id: string): Promise<Transaction[]> {
    const itens = Array.from(
      new Set(this.data.map((i) => i?.item?.id).filter((i) => i != null))
    );

    const lastTransactionsByItem = await Promise.all(
      itens.map(async (i) => {
        return await this.lastTrasaction(i);
      })
    );

    const userTransactionsLoan = lastTransactionsByItem
      .filter((i) => i?.user?.id === id && i.status === TransactionEnum.Loan)
      .map(TransactionAdapter.create);

    return Promise.resolve(userTransactionsLoan);
  }

  devolutionTransactionsByUser(id: string): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
  avaliableItens(): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
}
