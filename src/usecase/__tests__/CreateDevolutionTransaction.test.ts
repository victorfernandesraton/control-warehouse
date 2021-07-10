import CreateDevolutionTransaction from '../CreateDevolutionTransaction';
import ItemTrasactionsInMemoryRepository from '../../infra/repository/inMemory/ItemTransactions';
import ItemRepositoryInMemory from '../../infra/repository/inMemory/Item';
import {
  items,
  userBasic,
  transactions,
  userBasicAdmin,
} from '../../infra/repository/inMemory/__fake__';
import { TransactionEnum } from '../../core/entity/Transaction';

describe('CreateDevolutionTransaction', () => {
  describe('Sucess devolution', () => {
    test('should be devolution', async () => {
      const usecase = new CreateDevolutionTransaction({
        transactionRepository: new ItemTrasactionsInMemoryRepository(),
        itemRepository: new ItemRepositoryInMemory(),
      });
      expect(items[0].id).toBe(transactions[0].item.id);
      const result = await usecase.execute(transactions[0]);
      expect(result.status).toBe(TransactionEnum.Devolution);
    });

    test('should be able to deveolution with user is admin', async () => {
      const usecase = new CreateDevolutionTransaction({
        transactionRepository: new ItemTrasactionsInMemoryRepository(),
        itemRepository: new ItemRepositoryInMemory(),
      });

      const transaction = transactions[0];
      transaction.user = userBasicAdmin;
      expect(transaction.user.id).not.toBe(userBasic.id);
      expect(transaction.user.isAdmin).toBeTruthy();
      const result = await usecase.execute(transaction);
      expect(result.status).toBe(TransactionEnum.Devolution);
    });
  });
});
