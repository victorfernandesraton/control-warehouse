import Transaction, { TransactionEnum } from '../../core/entity/Transaction';
import { ItemObjectParams } from '../../adapters/Item';
import PaginationEntity from '../../shared/utils/PaginationEntity';
import { UserObjectParams } from '../../adapters/User';

export default interface ItemTrasactionsRepository {
  createTransaction(
    item: ItemObjectParams,
    status: TransactionEnum,
    user: UserObjectParams
  ): Promise<Transaction>;
  lastTrasaction(id: string): Promise<Transaction>;
  loanTransactionsByUser(
    id: string,
    limit?: number,
    afterAt?: string
  ): Promise<PaginationEntity<Transaction>>;
  devolutionTransactionsByUser(id: string): Promise<Transaction[]>;
  avaliableItens(): Promise<Transaction[]>;
}
