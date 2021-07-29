import ListAvaliableItens from '../ListAvaliableItens';
import ItemRepositoryInMemory from '../../infra/repository/memory/ItemRepository';
import ItemTransactionRepositoryInMemory from '../../infra/repository/memory/ItemTransactionRepository';
import TransactionAdapter from '../../adapters/Transaction';
import ItemAdapter from '../../adapters/Item';

describe('ListAvaliableItens', () => {
  const defaultTransactions = [
    {
      id: 'c360c863-0578-427a-9128-4418d4950d9b',
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
      user: {
        id: 'd1236519-2124-475a-9c45-fab829ec13ac',
        name: 'Victor Raton',
        email: 'vfbraton@gmail.com',
      },
      createdAt: '2023-01-22T03:00:01.000Z',
      updatedAt: '2023-01-22T03:00:01.000Z',
      status: 0,
    },
    {
      id: '06fd7679-ad8a-4823-bab0-d709daae8b33',
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
      user: {
        id: 'd1236519-2124-475a-9c45-fab829ec13ac',
        name: 'Victor Raton',
        email: 'vfbraton@gmail.com',
      },
      createdAt: '2021-01-22T03:00:00.000Z',
      updatedAt: '2021-01-22T03:00:00.000Z',
      status: 0,
    },
    {
      id: '5f881d43-f7e5-4d14-ae3d-3eac3dbe47ac',
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
      user: {
        id: 'd1236519-2124-475a-9c45-fab829ec13ac',
        name: 'Victor Raton',
        email: 'vfbraton@gmail.com',
      },
      createdAt: '2021-01-22T03:00:01.000Z',
      updatedAt: '2021-01-22T03:00:01.000Z',
      status: 1,
    },
  ].map(TransactionAdapter.create);
  const defaultItens = [
    {
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
    {
      id: '46ed59e9-2af9-4214-b525-d349f6041440',
      name: 'Chave de fenda n3',
      description: 'Uma chave de fenda',
      storage: {
        name: 'Caixa de cahevs de fenda',
        status: 0,
        capacity: 10,
        id: '03061a24-7ec5-4f21-9563-3611e27da429',
      },
    },
  ].map(ItemAdapter.create);
  test('have avaliable itens', async () => {
    const transactionRepository = new ItemTransactionRepositoryInMemory();
    const itemRepository = new ItemRepositoryInMemory();
    const transactionSpy = jest
      .spyOn(transactionRepository, 'itensInLoan')
      .mockImplementation(() => Promise.resolve(defaultTransactions));
    itemRepository.data = defaultItens;
    const usecase = new ListAvaliableItens(
      itemRepository,
      transactionRepository
    );
    const result = await usecase.execute();
    expect(result.data).toHaveLength(1);
    expect(result.data[0].id).toBe('46ed59e9-2af9-4214-b525-d349f6041440');
  });
  test('have avaliable itens after tarnsaciton loan', async () => {
    const transactionRepository = new ItemTransactionRepositoryInMemory();
    const itemRepository = new ItemRepositoryInMemory();
    const transactionSpy = jest
      .spyOn(transactionRepository, 'itensInLoan')
      .mockImplementation(() =>
        Promise.resolve([
          ...defaultTransactions,
          TransactionAdapter.create({
            id: '5f881d43-f7e5-4d14-ae3d-3eac3dbe47ac',
            item: {
              id: '46ed59e9-2af9-4214-b525-d349f6041440',
              name: 'Chave de fenda n3',
              description: 'Uma chave de fenda',
              storage: {
                name: 'Caixa de cahevs de fenda',
                status: 0,
                capacity: 10,
                id: '03061a24-7ec5-4f21-9563-3611e27da429',
              },
            },
            user: {
              id: 'd1236519-2124-475a-9c45-fab829ec13ac',
              name: 'Victor Raton',
              email: 'vfbraton@gmail.com',
            },
            createdAt: '2021-02-22T03:00:01.000Z',
            updatedAt: '2021-02-22T03:00:01.000Z',
            status: 0,
          }),
        ])
      );
    itemRepository.data = defaultItens;
    const usecase = new ListAvaliableItens(
      itemRepository,
      transactionRepository
    );
    const result = await usecase.execute();
    expect(result.data).toHaveLength(0);
  });
});
