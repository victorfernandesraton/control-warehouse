import { TransactionEnum } from '../../core/entity/Transaction';
import ItemTransactionRepositoryInMemory from '../../infra/repository/memory/ItemTransactionRepository';
import UserRepostoryInMemory from '../../infra/repository/memory/UserRepository';
import ListLoanByUser from '../ListLoanByUser';
import mock from '../../infra/repository/memory/__mocks__/ItemTransactions.json';
describe('ListLoanByUser', () => {
  test('shoud be 1 loan for user', async () => {
    const userRepository = new UserRepostoryInMemory();
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    const usecase = new ListLoanByUser({
      userRepository,
      itemTransactionRepository,
    });
    const userId = 'd1236519-2124-475a-9c45-fab829ec13ac';
    const transactionId = 'c360c863-0578-427a-9128-4418d4950d9b';

    const data = await usecase.execute(userId);
    expect(data).toHaveLength(1);
    expect(data?.[0].id).toBe(transactionId);
  });
  test('shoud be 3 loan for user', async () => {
    const userRepository = new UserRepostoryInMemory();
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    itemTransactionRepository.data = [...mock.data];

    const usecase = new ListLoanByUser({
      userRepository,
      itemTransactionRepository,
    });
    const userId = 'd1236519-2124-475a-9c45-fab829ec13ac';

    const data = await usecase.execute(userId);
    expect(data).toHaveLength(3);
    expect(data[0].id == 'c360c863-0578-427a-9128-4418d4950d9b');
  });
  test('shoud be 0 loan for user because product has been devolute', async () => {
    const userRepository = new UserRepostoryInMemory();
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    itemTransactionRepository.data = [...mock.data];
    const user = {
      id: 'eacca3d6-177b-41c9-822e-736c72949677',
      name: 'Paulo',
      email: 'paulo_jose@gmail.com',
    };
    userRepository.data = [...userRepository.data, user];

    const usecase = new ListLoanByUser({
      userRepository,
      itemTransactionRepository,
    });
    const userId = user.id;

    const data = await usecase.execute(userId);
    expect(data).toHaveLength(0);
  });
  test('shoud be 0 loan for user because user has never been create transaction', () => {});
  test('shoud be 0 loan for user because user has create devolution transactions only', () => {});
});
