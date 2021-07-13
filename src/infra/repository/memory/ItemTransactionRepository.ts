import Transaction, { TransactionEnum } from '../../../core/entity/Transaction';
import ItemTrasactionsRepository from '../ItemTrasactionsRepository';
import { ItemObjectParams } from '../../../adapters/Item';
import TransactionAdapter from '../../../adapters/Transaction';
import { UserObjectParams } from '../../../adapters/User';
export default class ItemTrajnsactionRepositoryInMemory
  implements ItemTrasactionsRepository
{
  data: any[] = [
    {
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
      status: TransactionEnum.Loan,
    },
  ];

  createTransaction(
    item: ItemObjectParams,
    status: TransactionEnum,
    user: UserObjectParams
  ): Promise<Transaction> {
    const transaction = TransactionAdapter.create({ item, status, user });
    this.data.push(transaction);
    return Promise.resolve(transaction);
  }
  lastTrasaction(id: string): Promise<Transaction> {
    const data = this.data.filter((transaction) => transaction.item.id === id);
    const last = data.sort((a, b) => a.createdAt - b.createdAt)?.[0];
    return Promise.resolve(last);
  }
}
