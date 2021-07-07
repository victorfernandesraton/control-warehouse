import Item from "../../../core/entity/Category";
import Transaction, { TransactionEnum } from "../../../core/entity/Transaction";
import User from "../../../core/entity/User";
import ITemTrasactionsInterface from "../ItemTrasactions";

export default class ItemTrasactionsInMemoryRepository
  implements ITemTrasactionsInterface
{
  private storage: Transaction[] = [];
  async createTransaction(user: User, item: Item): Promise<Transaction> {
    const transaction = new Transaction({
      user,
      item,
      status: TransactionEnum.Loan,
    });
    this.storage = [...this.storage, transaction];
    return transaction;
  }
  async lastTrasactionState(item: Item): Promise<Transaction | null> {
    const data = this.storage
      .filter((i) => item.id === i.id)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return data?.[0] ?? null;
  }

  async refusedTransaction(user: User, item: Item): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  cleanAllData() {
    this.storage = [];
  }
}
