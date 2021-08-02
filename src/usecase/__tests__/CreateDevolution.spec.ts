import UserRepostoryInMemory from '../../infra/repository/memory/UserRepository';
import ItemTransactionRepositoryInMemory from '../../infra/repository/memory/ItemTransactionRepository';
import ItemRepositoryInMemory from '../../infra/repository/memory/ItemRepository';

import CreateDevolution from '../CreateDevolution';
import { TransactionEnum } from '../../core/entity/Transaction';

describe('CreateDevolution', () => {
  test('shoud be a valid devolution', async () => {
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    const itemRepository = new ItemRepositoryInMemory();
    itemRepository.data = [
      ...itemRepository.data,
      {
        id: '46ed59e9-2af9-4214-b525-d349f6041440',
        name: 'Chave de fenda n3',
        description: 'Uma chave de fenda',
        storage: {
          name: 'Caixa de cahevs de fenda',

          id: '03061a24-7ec5-4f21-9563-3611e27da429',
        },
      },
    ];

    const userRepository = new UserRepostoryInMemory();
    itemTransactionRepository.createTransaction(
      {
        id: '46ed59e9-2af9-4214-b525-d349f6041440',
        name: 'Chave de fenda n3',
        description: 'Uma chave de fenda',
        storage: {
          name: 'Caixa de cahevs de fenda',
          id: '03061a24-7ec5-4f21-9563-3611e27da429',
        },
      },
      TransactionEnum.Loan,
      userRepository.data[0]
    );

    const usecase = new CreateDevolution({
      itemRepository,
      itemTransactionRepository,
      userRepository,
    });
    const result = await usecase.execute({
      itemId: '46ed59e9-2af9-4214-b525-d349f6041440',
      userId: 'd1236519-2124-475a-9c45-fab829ec13ac',
    });

    expect(result.status).toBe(TransactionEnum.Devolution);
    expect(result.user.id).toBe('d1236519-2124-475a-9c45-fab829ec13ac');
  });
  test('shoud be create devolution because user is admin', async () => {
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    const itemRepository = new ItemRepositoryInMemory();
    itemRepository.data = [
      ...itemRepository.data,
      {
        id: '46ed59e9-2af9-4214-b525-d349f6041440',
        name: 'Chave de fenda n3',
        description: 'Uma chave de fenda',
        storage: {
          name: 'Caixa de cahevs de fenda',

          id: '03061a24-7ec5-4f21-9563-3611e27da429',
        },
      },
    ];

    const userRepository = new UserRepostoryInMemory();
    userRepository.data = [
      ...userRepository.data,
      {
        id: '730079df-547c-4844-ac04-6f181801ab80',
        name: 'João Machado',
        email: 'j_machado@gmail.com',
        isAdmin: true,
      },
    ];
    itemTransactionRepository.createTransaction(
      {
        id: '46ed59e9-2af9-4214-b525-d349f6041440',
        name: 'Chave de fenda n3',
        description: 'Uma chave de fenda',
        storage: {
          name: 'Caixa de cahevs de fenda',

          id: '03061a24-7ec5-4f21-9563-3611e27da429',
        },
      },
      TransactionEnum.Loan,
      userRepository.data[0]
    );
    const usecase = new CreateDevolution({
      itemRepository,
      itemTransactionRepository,
      userRepository,
    });
    const result = await usecase.execute({
      itemId: '46ed59e9-2af9-4214-b525-d349f6041440',
      userId: '730079df-547c-4844-ac04-6f181801ab80',
    });

    expect(result.status).toBe(TransactionEnum.Devolution);
    expect(result.user.id).toBe('730079df-547c-4844-ac04-6f181801ab80');
    expect(result.user.isAdmin).toBeTruthy();
  });

  test('shoud be not create devolution because item is not in user', async () => {
    const itemTransactionRepository = new ItemTransactionRepositoryInMemory();
    const itemRepository = new ItemRepositoryInMemory();
    itemRepository.data = [
      ...itemRepository.data,
      {
        id: '46ed59e9-2af9-4214-b525-d349f6041440',
        name: 'Chave de fenda n3',
        description: 'Uma chave de fenda',
        storage: {
          name: 'Caixa de cahevs de fenda',

          id: '03061a24-7ec5-4f21-9563-3611e27da429',
        },
      },
    ];

    const userRepository = new UserRepostoryInMemory();
    userRepository.data = [
      ...userRepository.data,
      {
        id: '730079df-547c-4844-ac04-6f181801ab80',
        name: 'João Machado',
        email: 'j_machado@gmail.com',
      },
    ];
    itemTransactionRepository.createTransaction(
      {
        id: '46ed59e9-2af9-4214-b525-d349f6041440',
        name: 'Chave de fenda n3',
        description: 'Uma chave de fenda',
        storage: {
          name: 'Caixa de cahevs de fenda',

          id: '03061a24-7ec5-4f21-9563-3611e27da429',
        },
      },
      TransactionEnum.Loan,
      userRepository.data[0]
    );
    const usecase = new CreateDevolution({
      itemRepository,
      itemTransactionRepository,
      userRepository,
    });

    await expect(
      usecase.execute({
        itemId: '46ed59e9-2af9-4214-b525-d349f6041440',
        userId: '730079df-547c-4844-ac04-6f181801ab80',
      })
    ).rejects.toThrowError('Item cannot be devolution for another user');
  });
});
