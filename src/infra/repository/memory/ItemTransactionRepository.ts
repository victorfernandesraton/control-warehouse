import Transaction, { TransactionEnum } from '../../../core/entity/Transaction';
import ItemTrasactionsRepository from '../ItemTrasactionsRepository';
import { ItemObjectParams } from '../../../adapters/Item';
import TransactionAdapter, {
  TransactionObjectParams,
} from '../../../adapters/Transaction';
import { UserObjectParams } from '../../../adapters/User';
import { data } from './__mocks__/ItemTransactions.json';
import PaginationEntity from '../../../shared/utils/PaginationEntity';
import PaginationEntityAdapter from '../../../adapters/PaginationEntity';
export default class ItemTransactionRepositoryInMemory
  implements ItemTrasactionsRepository
{
  data: TransactionObjectParams[] = [data[0]];

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
    const data = this.data
      .filter((transaction) => transaction.item.id === id)
      .map(TransactionAdapter.create);
    const transactions = data.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    return Promise.resolve(transactions[0]);
  }
  async loanTransactionsByUser(
    id: string,
    limit = 5,
    afterAt?: string
  ): Promise<PaginationEntity<Transaction>> {
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

    return Promise.resolve(
      PaginationEntityAdapter.createFormMemory(userTransactionsLoan, {
        limit,
        after: afterAt,
      })
    );
  }

  devolutionTransactionsByUser(id: string): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
  avaliableItens(): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
}
