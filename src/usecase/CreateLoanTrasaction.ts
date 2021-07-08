import Item from "../core/entity/Item";
import Transaction, { TransactionEnum } from "../core/entity/Transaction";
import User from "../core/entity/User";
import CategoryRepository from "../infra/repository/CategoryRepository";
import ITemTrasactionsInterface from "../infra/repository/ItemTrasactions";
import StorageRepository from "../infra/repository/StorageRepository";

export interface CreateLoanTransactionObjectParams {
  transactionRepo: ITemTrasactionsInterface;
  categoryRepository: CategoryRepository;
  storageRepository: StorageRepository;
}

export default class CreateLoanTransaction {
  private transactionRepo: ITemTrasactionsInterface;
  private categoryRepository: CategoryRepository;
  private storageRepository: StorageRepository;
  constructor({
    transactionRepo,
    storageRepository,
    categoryRepository,
  }: CreateLoanTransactionObjectParams) {
    this.transactionRepo = transactionRepo;
    this.categoryRepository = categoryRepository;
    this.storageRepository = storageRepository;
  }

  async execute(user: User, item: Item): Promise<Transaction> {
    try {
      const [isBeenLoan, validCategory, validStorage] = await Promise.all([
        this.transactionRepo.lastTrasactionState(item),
        this.categoryRepository.find(item.category),
        this.storageRepository.find(item.storage),
      ]);

      if (!validCategory) {
        throw new Error(
          `category (${item.category.name}/${item.category.id}) not valid`
        );
      }
      if (!validStorage) {
        throw new Error(
          `storage (${item.storage.name}/${item.storage.id}) not valid`
        );
      }

      if ([TransactionEnum.Loan].includes(isBeenLoan?.status)) {
        throw new Error("cannot create Item Transaction when item is in Loan");
      }
      const result = await this.transactionRepo.createTransaction(user, item);

      return result;
    } catch (error) {
      throw error;
    }
  }
}
