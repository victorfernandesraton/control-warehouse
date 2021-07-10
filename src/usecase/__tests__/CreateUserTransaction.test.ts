import CreateLoanTransaction from '../CreateLoanTrasaction';

import Item from '../../core/entity/Item';
import ItemRepositoryInMemory from '../../infra/repository/inMemory/Item';
import ItemTrasactionsInMemoryRepository from '../../infra/repository/inMemory/ItemTransactions';

import Transaction, { TransactionEnum } from '../../core/entity/Transaction';

import User from '../../core/entity/User';
import Storage from '../../core/entity/Storage';
import Category from '../../core/entity/Category';

const userBasic = new User({
  email: 'vfbraton@gmail.com',
  name: 'Victor Raton',
});

describe('CreateUserTransaction', () => {
  describe('Sucessfull transaction', () => {
    test('should be created transaction', async function () {
      const transactionRepo = new ItemTrasactionsInMemoryRepository();
      const storage = new Storage({
        name: 'Caixa 1',
        description: 'Caixa de ferramentas 1',
      });
      const category = new Category({
        name: 'chave de fenda',
        description: 'conjunto de chaves',
        uniqueName: 'CHAVE_DE_FENDA',
      });

      const item = new Item({
        name: 'Chave de fenda',
        description: 'uma chave de fenda',
        category,
        storage,
      });
      const itemRepository = new ItemRepositoryInMemory([item]);
      const usecase = new CreateLoanTransaction({
        transactionRepo,
        itemRepository,
      });

      const result = await usecase.execute(
        new Transaction({
          item,
          user: userBasic,
        })
      );
      await expect(transactionRepo.lastTrasactionState(item)).resolves.toEqual(result);
      expect(result.status).toBe(TransactionEnum.Loan);
      expect(transactionRepo.store).toHaveLength(1);
      expect(transactionRepo.store).toContainEqual(result);
    });
  });
  describe('Error cases', () => {
    test('should be devolution', async function () {
      const storage = new Storage({
        name: 'Caixa 1',
        description: 'Caixa de ferramentas 1',
      });
      const category = new Category({
        name: 'chave de fenda',
        description: 'conjunto de chaves',
        uniqueName: 'CHAVE_DE_FENDA',
      });

      const item = new Item({
        name: 'Chave de fenda',
        description: 'uma chave de fenda',
        category,
        storage,
      });
      const itemRepository = new ItemRepositoryInMemory([item]);

      const transactionRepo = new ItemTrasactionsInMemoryRepository([
        new Transaction({
          item,
          user: userBasic,
        }),
      ]);
      const usecase = new CreateLoanTransaction({
        transactionRepo,
        itemRepository,
      });

      expect(transactionRepo.store).toHaveLength(1);
      await expect(transactionRepo.lastTrasactionState(item)).resolves.toBeDefined();
      await expect(
        usecase.execute(
          new Transaction({
            item,
            user: userBasic,
            status: TransactionEnum.Loan,
          })
        )
      ).rejects.toThrowError('cannot create Item Transaction when item is in Loan');
    });
  });
});
