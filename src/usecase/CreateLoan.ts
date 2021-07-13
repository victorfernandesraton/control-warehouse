import Transaction, { TransactionEnum } from '../core/entity/Transaction';
import ItemTrasactionsRepository from '../infra/repository/ItemTrasactionsRepository';
import ItemRepository from '../infra/repository/ItemRepository';
import UserRepository from '../infra/repository/UserRepository';

export interface CreateLoanParams {
  itemRepository: ItemRepository;
  itemTrasactionsRepository: ItemTrasactionsRepository;
  userRepository: UserRepository;
}

export interface CreateLoanExecuteParams {
  itemId: string;
  userId: string;
  status?: TransactionEnum;
}

export default class CreateLoan {
  itemRepository: ItemRepository;
  ItemTrasactionsRepository: ItemTrasactionsRepository;
  UserRepository: UserRepository;
  constructor({
    itemRepository,
    itemTrasactionsRepository,
    userRepository,
  }: CreateLoanParams) {
    this.ItemTrasactionsRepository = itemTrasactionsRepository;
    this.UserRepository = userRepository;
    this.itemRepository = itemRepository;
  }

  async execute({
    itemId,
    userId,
    status = TransactionEnum.Loan,
  }: CreateLoanExecuteParams): Promise<Transaction> {
    const [item, user, lastItemTransaction] = await Promise.all([
      this.itemRepository.find(itemId),
      this.UserRepository.find(userId),
      this.ItemTrasactionsRepository.lastTrasaction(itemId),
    ]);

    if (!item) {
      throw new Error(`Item (${itemId} is not found`);
    }

    if (!user) {
      throw new Error(`User (${userId} is not found`);
    }

    if (
      [TransactionEnum.Canceled, TransactionEnum.Loan].includes(
        lastItemTransaction?.status
      )
    ) {
      throw new Error(
        `Cannot execute transaction because item (${itemId} is been unvaliable`
      );
    }

    return await this.ItemTrasactionsRepository.createTransaction(
      item,
      status,
      user
    );
  }
}
