import Transaction from '../core/entity/Transaction';
import ItemTrasactionsRepository from '../infra/repository/ItemTrasactionsRepository';
import UserRepository from '../infra/repository/UserRepository';

export interface ListLoanByUserParams {
  itemTransactionRepository: ItemTrasactionsRepository;
  userRepository: UserRepository;
}
export default class ListLoanByUser {
  itemTransactionRepository: ItemTrasactionsRepository;
  userRepository: UserRepository;

  constructor({
    itemTransactionRepository,
    userRepository,
  }: ListLoanByUserParams) {
    this.itemTransactionRepository = itemTransactionRepository;
    this.userRepository = userRepository;
  }

  async execute(
    userId: string,
    limit?: number,
    beforeAt?: string
  ): Promise<Transaction[]> {
    const user = await this.userRepository.find(userId);

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    return await this.itemTransactionRepository.loanTransactionsByUser(
      user.id,
      limit,
      beforeAt
    );
  }
}
