import Transaction, { TransactionEnum } from '../../core/entity/Transaction';
import { ItemObjectParams } from '../../adapters/Item';
import PaginationEntity from '../../shared/utils/PaginationEntity';
import { UserObjectParams } from '../../adapters/User';
import Item from '../../core/entity/Item';

export default interface ItemTrasactionsRepository {
  createTransaction(
    item: ItemObjectParams,
    status: TransactionEnum,
    user: UserObjectParams
  ): Promise<Transaction>;
  lastTrasaction(id: string): Promise<Transaction>;
  lastLoanTransactionByUser(
    id: string,
    limit?: number,
    afterAt?: string
  ): Promise<PaginationEntity<Transaction>>;
  devolutionTransactionsByUser(id: string): Promise<Transaction[]>;
}
