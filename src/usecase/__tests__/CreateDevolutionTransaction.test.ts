import CreateDevolutionTransaction from '../CreateDevolutionTransaction';
import ItemTrasactionsInMemoryRepository from '../../infra/repository/inMemory/ItemTransactions';
import ItemRepositoryInMemory from '../../infra/repository/inMemory/Item';
import Item from '../../core/entity/Item';
import { categpries, storages, items, userBasic, transactions } from '../__fake__';
import { TransactionEnum } from '../../core/entity/Transaction';

describe('CreateDevolutionTransaction', () => {
  describe('Sucess devolution', () => {
    test('should be devolution', async () => {
      const usecase = new CreateDevolutionTransaction({
        transactionRepository: new ItemTrasactionsInMemoryRepository(transactions),
        itemRepository: new ItemRepositoryInMemory([items[0]]),
      });
      const result = await usecase.execute(transactions[0]);
      expect(result.status).toBe(TransactionEnum.Devolution);
    });
  });
});
