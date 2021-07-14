import Transaction, { TransactionEnum } from '../../core/entity/Transaction';
import { ItemObjectParams } from '../../adapters/Item';

export default interface ItemTrasactionsRepository {
  createTransaction(
    item: ItemObjectParams,
    status: TransactionEnum,
    user: any
  ): Promise<Transaction>;
  lastTrasaction(id: string): Promise<Transaction>;
  loanTransactionsByUser(id: string): Promise<Transaction[]>;
  devolutionTransactionsByUser(id: string): Promise<Transaction[]>;
  avaliableItens(): Promise<Transaction[]>;
}
