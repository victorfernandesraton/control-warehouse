import CreateLoan from '../CreateLoan';
import ItemRepositoryInMemory from '../../infra/repository/memory/ItemRepository';
import UserRepostoryInMemory from '../../infra/repository/memory/UserRepository';
import ItemTransactionRepositoryInMemory from '../../infra/repository/memory/ItemTransactionRepository';
import { TransactionEnum } from '../../core/entity/Transaction';

describe('CreateLoan', () => {
  test('shoud be create a simple loan', async () => {
    const itemRepository = new ItemRepositoryInMemory();
    const userRepository = new UserRepostoryInMemory();
    const itemTrasactionsRepository = new ItemTransactionRepositoryInMemory();

    const userId = 'd1236519-2124-475a-9c45-fab829ec13ac';
    const item = {
      id: 'ba2b481c-41a4-4e95-ad69-f0600b258488',
      name: 'Chave de fenda n4',
      description: 'Uma chave de fenda',
      tag: ['chave', 'proteção elétrica'],
      storage: {
        name: 'Caixa de cahevs de fenda',
        status: 0,
        capacity: 10,
        id: '03061a24-7ec5-4f21-9563-3611e27da429',
      },
    };

    itemRepository.data = [...itemRepository.data, item];

    const usecase = new CreateLoan({
      itemRepository,
      userRepository,
      itemTrasactionsRepository,
    });

    const data = await usecase.execute({ itemId: item.id, userId });
    expect(data).toHaveProperty('id');
    expect(data.item.name).toBe('Chave de fenda n4');
    expect(data.status).toBe(TransactionEnum.Loan);
    expect(itemTrasactionsRepository.data).toHaveLength(2);
  });
});
