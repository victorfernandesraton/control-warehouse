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

    if (!lastItemTransaction) {
      throw new Error('Item shoud be not devolev because is not loan');
    }

    if (lastItemTransaction?.status != TransactionEnum.Loan) {
      throw new Error(
        `Item (${transaction.item.name}/${transaction.item.id}) shoud not be a devolution because is not a loanned ${lastItemTransaction.id}`
      );
    }

    if (!transaction.user.isAdmin && lastItemTransaction.user.id != transaction.user.id) {
      throw new Error(
        `User(${transaction.user.name}/${transaction.user.id}) not be Devolution because is not user tham loan`
      );
    }

    if (transaction.status != TransactionEnum.Devolution) {
      transaction.status = TransactionEnum.Devolution;
    }
    const result = await this.transactionRepository.createTransaction(transaction);
    return result;
  }
}
