import Item from '../core/entity/Item';
import User from '../core/entity/User';
import ItemRepository from '../infra/repository/ItemRepository';
import ITemTrasactionsInterface from '../infra/repository/ItemTrasactions';
import Transaction, { TransactionEnum } from '../core/entity/Transaction';

export interface CreateDevolutionTrasactionParams {
  itemRepository: ItemRepository;
  transactionRepository: ITemTrasactionsInterface;
}
export default class CreateDevolutionTransaction {
  itemRepsitory: ItemRepository;
  transactionRepository: ITemTrasactionsInterface;
  constructor({ itemRepository, transactionRepository }: CreateDevolutionTrasactionParams) {
    this.itemRepsitory = itemRepository;
    this.transactionRepository = transactionRepository;
  }

  async execute(transaction: Transaction): Promise<Transaction> {
    const [lastItemTransaction, hasbeenItem] = await Promise.all([
      this.transactionRepository.lastTrasactionState(transaction.item),
      this.itemRepsitory.find(transaction.item),
    ]);

    if (transaction.status != TransactionEnum.Devolution) {
      transaction.status = TransactionEnum.Devolution;
    }

    if (lastItemTransaction.user.id !== transaction.user.id && !transaction.user.isAdmin) {
      throw new Error(
        `User(${transaction.user.name}/${transaction.user.id}) not be Devolution because is not user tham loan`
      );
    }

    const result = await this.transactionRepository.createTransaction(transaction);
    return result;
  }
}
