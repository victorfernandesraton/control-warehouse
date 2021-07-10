import Item from '../../core/entity/Item';
import Transaction from '../../core/entity/Transaction';

export default interface ITemTrasactionsInterface {
  createTransaction(transaction: Transaction): Promise<Transaction>;
  lastTrasactionState(item: Item): Promise<Transaction | null>;
}
