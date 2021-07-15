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

    const { data } = await usecase.execute(userId);
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

    const { data } = await usecase.execute(userId);
    expect(data).toHaveLength(3);
    expect(data[0].id == 'c360c863-0578-427a-9128-4418d4950d9b');
  });
  test('shoud be paginatetd 2 loans in first page and one in second', async () => {
    const userRepository = new UserRepostoryInMemory();
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    itemTransactionRepository.data = [...mock.data];

    const usecase = new ListLoanByUser({
      userRepository,
      itemTransactionRepository,
    });
    const userId = 'd1236519-2124-475a-9c45-fab829ec13ac';

    const { data } = await usecase.execute(userId, 2);
    expect(data).toHaveLength(2);
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

    const { data } = await usecase.execute(userId);
    expect(data).toHaveLength(0);
  });
  test('shoud be 0 loan for user because user has never been create transaction', async () => {
    const user = {
      id: '730079df-547c-4844-ac04-6f181801ab80',
      name: 'João Machado',
      email: 'j_machado@gmail.com',
    };
    const userRepository = new UserRepostoryInMemory();
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    userRepository.data = [...userRepository.data, user];

    const usecase = new ListLoanByUser({
      userRepository,
      itemTransactionRepository,
    });

    const userId = user.id;

    const { data } = await usecase.execute(userId);
    expect(data).toHaveLength(0);
  });
  test('shoud be 0 loan for user because user has create devolution transactions only', async () => {
    const user = {
      id: '730079df-547c-4844-ac04-6f181801ab80',
      name: 'João Machado',
      email: 'j_machado@gmail.com',
      isAdmin: true,
    };
    const userRepository = new UserRepostoryInMemory();
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    userRepository.data = [...userRepository.data, user];
    itemTransactionRepository.data = [
      ...itemTransactionRepository.data,
      {
        id: '30c8386c-2b8f-4dbe-af63-210466154946',

        item: {
          id: '423a3d8c-9d25-492e-82ae-9c1573bc9b3e',
          name: 'Chave de fenda n5',
          description: 'Uma chave de fenda',
          tag: ['chave', 'proteção elétrica'],
          storage: {
            name: 'Caixa de cahevs de fenda',
            status: 0,
            capacity: 10,
            id: '03061a24-7ec5-4f21-9563-3611e27da429',
          },
        },
        user,
        createdAt: '2023-03-22T03:00:01.000Z',
        updatedAt: '2023-03-22T03:00:01.000Z',
        status: 1,
      },
    ];

    const usecase = new ListLoanByUser({
      userRepository,
      itemTransactionRepository,
    });

    const userId = user.id;

    const { data } = await usecase.execute(userId);
    expect(data).toHaveLength(0);
  });
  test('shoud be not ececute because user is not valid', async () => {
    const user = {
      id: '730079df-547c-4844-ac04-6f181801ab80',
      name: 'João Machado',
      email: 'j_machado@gmail.com',
      isAdmin: true,
    };
    const userRepository = new UserRepostoryInMemory();
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    const usecase = new ListLoanByUser({
      userRepository,
      itemTransactionRepository,
    });

    const userId = user.id;

    await expect(usecase.execute(userId)).rejects.toThrowError(
      `User ${user.id} not found`
    );
  });
});
