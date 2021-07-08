import Item from "../../../core/entity/Category";
import Transaction, { TransactionEnum } from "../../../core/entity/Transaction";
import User from "../../../core/entity/User";
import ITemTrasactionsInterface from "../ItemTrasactions";
import InMemoryDb from "./inMemory";

export default class ItemTrasactionsInMemoryRepository
  extends InMemoryDb<Transaction>
  implements ITemTrasactionsInterface
{
  async createTransaction(user: User, item: Item): Promise<Transaction> {
    const transaction = new Transaction({
      user,
      item,
      status: TransactionEnum.Loan,
    });
    this.store = [...this.store, transaction];
    return transaction;
  }
  async lastTrasactionState(item: Item): Promise<Transaction | null> {
    const data = this.store
      .filter((i) => item.id === i.id)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return data?.[0] ?? null;
  }

  async refusedTransaction(user: User, item: Item): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  cleanAllData() {
    this.store = [];
  }
}
