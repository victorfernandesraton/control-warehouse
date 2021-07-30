import PaginationEntityAdapter from '../../../adapters/PaginationEntity';
import UserAdapter from '../../../adapters/User';
import TransactionAdapter from '../../../adapters/Transaction';
import User from '../../../core/entity/User';
import Transaction from '../../../core/entity/Transaction';
import { data } from '../../../infra/repository/memory/__mocks__/User.json';
import { data as transactions } from '../../../infra/repository/memory/__mocks__/ItemTransactions.json';

describe('PaginationEtity', () => {
  test('Shoud be list of users and return 2 itens', () => {
    const list: Array<User> = [...data.map(UserAdapter.create)];
    const result = PaginationEntityAdapter.create(list, { limit: 2 });
    expect(list).toHaveLength(3);
    expect(result.before).toBeUndefined();
    expect(result.data).toHaveLength(2);
    expect(result.after).toBe(list[1].id);

    expect(result.data[0].id).toBe(list[0].id);
    expect(result.data[1].id).toBe(list[1].id);
  });
  test('Shoud be list of users and paginated twice', () => {
    const list: Array<User> = [...data.map(UserAdapter.create)];
    const result = PaginationEntityAdapter.create(list, { limit: 2 });

    expect(list).toHaveLength(3);

    expect(result.before).toBeUndefined();
    expect(result.after).toBe(list[1].id);
    expect(result.data).toHaveLength(2);

    const final = PaginationEntityAdapter.create(list, {
      limit: 2,
      after: result.after,
    });

    expect(list).toHaveLength(3);
    expect(final.after).toBeUndefined();
    expect(final.before).toBe(list[2].id);
    expect(final.data).toHaveLength(1);
  });
  test('Shoud be list of trasaction and paginated more to twice times', () => {
    const list: Array<Transaction> = transactions.map(
      TransactionAdapter.create
    );

    const result = PaginationEntityAdapter.create(list, { limit: 2 });

    expect(list).toHaveLength(8);

    expect(result.before).toBeUndefined();
    expect(result.after).toBe(list[1].id);
    expect(result.data).toHaveLength(2);

    const final = PaginationEntityAdapter.create(list, {
      limit: 2,
      after: result.after,
    });

    expect(list).toHaveLength(8);

    expect(final.data).toHaveLength(2);
    expect(final.after).toBe(list[3].id);
    expect(final.before).toBe(list[2].id);

    const extra = PaginationEntityAdapter.create(list, {
      limit: 6,
      after: final.after,
    });

    expect(extra.before).toBe(list[5].id);
    expect(extra.after).toBeUndefined();
    expect(extra.data).toHaveLength(4);
  });
});
