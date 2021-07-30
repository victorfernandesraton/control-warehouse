import Transaction from '../core/entity/Transaction';
import ItemTrasactionsRepository from '../infra/repository/ItemTrasactionsRepository';
import UserRepository from '../infra/repository/UserRepository';
import PaginationEntity from '../shared/utils/PaginationEntity';

export interface ListLoanByUserParams {
  itemTransactionRepository: ItemTrasactionsRepository;
  userRepository: UserRepository;
}
export default class ListLoanByUser {
  readonly itemTransactionRepository: ItemTrasactionsRepository;
  readonly userRepository: UserRepository;

  constructor({
    itemTransactionRepository,
    userRepository,
  }: ListLoanByUserParams) {
    this.itemTransactionRepository = itemTransactionRepository;
    this.userRepository = userRepository;
  }

  async execute(
    userId: string,
    limit = 5,
    afterAt?: string
  ): Promise<PaginationEntity<Transaction>> {
    const user = await this.userRepository.find(userId);

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    return await this.itemTransactionRepository.lastLoanTransactionByUser(
      user.id,
      limit,
      afterAt
    );
  }
}
