import ItemTrasactionsRepository from '../ItemTrasactionsRepository';
import Transaction, { TransactionEnum } from '../../../core/entity/Transaction';
import { ItemObjectParams } from '../../../adapters/Item';
import TransactionAdapter, {
  TransactionObjectParams,
} from '../../../adapters/Transaction';

import PaginationEntity from '../../../shared/utils/PaginationEntity';
import { PaginationEntityAdapterStrategy } from '../../../adapters/PaginationEntity';

import { UserObjectParams } from '../../../adapters/User';

import { data } from './__mocks__/ItemTransactions.json';
export default class ItemTransactionRepositoryInMemory
  implements ItemTrasactionsRepository
{
  data: TransactionObjectParams[] = [data[0]];
  ItenAvaliableRepository;
  constructor(readonly paginationAdapter: PaginationEntityAdapterStrategy) {}

  protected uniqueItens(): string[] {
    return Array.from(
      new Set(this.data.map((i) => i?.item?.id).filter((i) => i != null))
    );
  }

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
  async lastLoanTransactionByUser(
    id: string,
    limit = 5,
    afterAt?: string
  ): Promise<PaginationEntity<Transaction>> {
    const itens = this.uniqueItens();

    const lastTransactionsByItem = await Promise.all(
      itens.map(async (i) => {
        return await this.lastTrasaction(i);
      })
    );

    const userTransactionsLoan = lastTransactionsByItem
      .filter((i) => i?.user?.id === id && i.status === TransactionEnum.Loan)
      .map(TransactionAdapter.create);

    return Promise.resolve(
      this.paginationAdapter.create(userTransactionsLoan, {
        limit,
        after: afterAt,
      })
    );
  }
  async itensInLoan(): Promise<Transaction[]> {
    const itens = this.uniqueItens();

    const lastTransactionsByItem = await Promise.all(
      itens.map(async (i) => {
        return await this.lastTrasaction(i);
      })
    );

    const transactions = lastTransactionsByItem.filter(
      (transaction) =>
        ![TransactionEnum.Canceled, TransactionEnum.Loan].includes(
          transaction.status
        )
    );

    return Promise.resolve(transactions);
  }
}
