import User from '../core/entity/User';
import Item from '../core/entity/Item';
import ItemRepository from '../infra/repository/ItemRepository';
import ItemTrasactionsRepository from '../infra/repository/ItemTrasactionsRepository';
import UserRepository from '../infra/repository/UserRepository';
import Transaction, { TransactionEnum } from '../core/entity/Transaction';

export interface CreateDevolutionParams {
  itemTransactionRepository: ItemTrasactionsRepository;
  userRepository: UserRepository;
  itemRepository: ItemRepository;
}

export interface CreateDevolutionExecuteParams {
  user: User;
  item: Item;
}
export default class CreateDevolution {
  readonly itemTransactionRepository: ItemTrasactionsRepository;
  readonly userRepository: UserRepository;
  readonly itemRepository: ItemRepository;
  constructor({
    itemTransactionRepository,
    userRepository,
    itemRepository,
  }: CreateDevolutionParams) {
    this.itemTransactionRepository = itemTransactionRepository;
    this.userRepository = userRepository;
    this.itemRepository = itemRepository;
  }

  async execute({
    user,
    item,
  }: CreateDevolutionExecuteParams): Promise<Transaction> {
    const [findUser, lastTransaction, findItem] = await Promise.all([
      this.userRepository.find(user.id),
      this.itemTransactionRepository.lastTrasaction(item.id),
      this.itemRepository.find(item.id),
    ]);

    if (!findUser) {
      throw new Error('User not found');
    }
    if (!findItem) {
      throw new Error('Item cannot be devolution');
    }

    if (!lastTransaction || lastTransaction.status !== TransactionEnum.Loan) {
      throw new Error('item cannot be devolution because is not loan');
    }

    if (!findUser.isAdmin && lastTransaction.user.id !== findUser.id) {
      throw new Error('Item cannot be devolution for another user');
    }

    const tramsaction = await this.itemTransactionRepository.createTransaction(
      findItem,
      TransactionEnum.Devolution,
      findUser
    );

    return Promise.resolve(tramsaction);
  }
}
