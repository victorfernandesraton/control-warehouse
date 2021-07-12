import Item from '../../core/entity/Item';
import Transaction from '../../core/entity/Transaction';

export default interface ItemTrasactionsRepository {
  createTransaction(transaction: Transaction): Promise<Transaction>;
  lastTrasactionState(item: Item): Promise<Transaction | null>;
}
