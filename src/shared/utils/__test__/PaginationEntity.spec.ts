import PaginationEntityAdapter from '../../../adapters/PaginationEntity';
import UserAdapter from '../../../adapters/User';
import TransactionAdapter from '../../../adapters/Transaction';
import User from '../../../core/entity/User';
import Transaction from '../../../core/entity/Transaction';
import { data } from '../../../infra/repository/memory/__mocks__/User.json';
import { data as transactions } from '../../../infra/repository/memory/__mocks__/ItemTransactions.json';

describe('PaginationEtity', () => {
  test.skip('Shoud be list of users and return 2 itens', () => {
    const list: Array<User> = [...data.map(UserAdapter.create)];
    const result = PaginationEntityAdapter.createFormMemory(list, { limit: 2 });

    expect(list).toHaveLength(3);
    expect(result.before).toBe(data[2].id);
    expect(result.data).toHaveLength(2);
    expect(result.after).toBeUndefined();
  });
  test('Shoud be list of users and paginated twice', () => {
    const list: Array<User> = [...data.map(UserAdapter.create)];
    const result = PaginationEntityAdapter.createFormMemory(list, { limit: 2 });

    expect(list).toHaveLength(3);

    expect(result.before).toBe(data[2].id);
    expect(result.data).toHaveLength(2);
    expect(result.after).toBeUndefined();

    const final = PaginationEntityAdapter.createFormMemory(list, {
      limit: 2,
      after: result.before,
    });

    expect(list).toHaveLength(3);

    expect(final.before).toBeUndefined();
    expect(final.after).toBe(result.data[1].id);
    expect(final.data).toHaveLength(1);
  });
  test('Shoud be list of users and paginated twice', () => {
    const list: Array<Transaction> = transactions.map(
      TransactionAdapter.create
    );

    const result = PaginationEntityAdapter.createFormMemory(list, { limit: 2 });

    expect(list).toHaveLength(8);

    expect(result.before).toBe(list[2].id);
    expect(result.data).toHaveLength(2);
    expect(result.after).toBeUndefined();

    const final = PaginationEntityAdapter.createFormMemory(list, {
      limit: 2,
      after: result.before,
    });

    expect(list).toHaveLength(8);

    expect(final.before).toBe(list[4].id);
    expect(final.after).toBe(result.data[1].id);
    // expect(final.data).toHaveLength(2);

    const extra = PaginationEntityAdapter.createFormMemory(list, {
      limit: 6,
      after: final.before,
    });
    expect(extra.before).toBeUndefined();
    expect(extra.after).toBe(final.data[1].id);
    // expect(final.data).toHaveLength(2);
  });
});
