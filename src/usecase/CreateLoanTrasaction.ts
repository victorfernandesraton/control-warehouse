import Transaction, { TransactionEnum } from '../core/entity/Transaction';
import ItemRepository from '../infra/repository/ItemRepository';
import ITemTrasactionsInterface from '../infra/repository/ItemTrasactions';

export interface CreateLoanTransactionObjectParams {
  transactionRepo: ITemTrasactionsInterface;
  itemRepository: ItemRepository;
}

export default class CreateLoanTransaction {
  private transactionRepo: ITemTrasactionsInterface;
  private itemRepository: ItemRepository;
  constructor({ transactionRepo, itemRepository }: CreateLoanTransactionObjectParams) {
    this.transactionRepo = transactionRepo;
    this.itemRepository = itemRepository;
  }

  async execute(transaction: Transaction): Promise<Transaction> {
    // eslint-disable-next-line no-useless-catch
    try {
      const [hasItem, lastTransactionForItem] = await Promise.all([
        this.itemRepository.find(transaction.item),
        this.transactionRepo.lastTrasactionState(transaction.item),
      ]);

      if (!hasItem) {
        throw new Error(
          `item (${transaction.item.name}/${transaction.item.category.id}) not valid`
        );
      }

      const isBeenLoan = lastTransactionForItem?.status == TransactionEnum.Loan;

      if (isBeenLoan) {
        throw new Error('cannot create Item Transaction when item is in Loan');
      }
      const result = await this.transactionRepo.createTransaction(transaction);

      return Promise.resolve(result);
    } catch (error) {
      throw error;
    }
  }
}
