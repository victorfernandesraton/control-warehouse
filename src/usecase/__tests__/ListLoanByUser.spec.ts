import ItemTransactionRepositoryInMemory from '../../infra/repository/memory/ItemTransactionRepository';
import UserRepostoryInMemory from '../../infra/repository/memory/UserRepository';
import ListLoanByUser from '../ListLoanByUser';

describe('ListLoanByUser', () => {
  test('shoud be 1 loan for user', async () => {
    const userRepository = new UserRepostoryInMemory();
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    const usecase = new ListLoanByUser({
      userRepository,
      itemTransactionRepository,
    });
    const userId = 'd1236519-2124-475a-9c45-fab829ec13ac';
    const transactionId = '06fd7679-ad8a-4823-bab0-d709daae8b33';

    const data = await usecase.execute(userId);
    expect(data).toHaveLength(1);
    expect(data?.[0].id).toBe(transactionId);
  });
  test('shoud be 3 loan for user', () => {});
  test('shoud be 1 loan for user but product have more tham one transaction', () => {});
  test('shoud be 0 loan for user because product has been devolute', () => {});
  test('shoud be 0 loan for user because user has never been create transaction', () => {});
  test('shoud be 0 loan for user because user has create devolution transactions only', () => {});
});
