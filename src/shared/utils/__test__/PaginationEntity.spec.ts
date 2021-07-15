import PaginationEntityAdapter from '../../../adapters/PaginationEntity';
import UserAdapter from '../../../adapters/User';
import User from '../../../core/entity/User';
import { data } from '../../../infra/repository/memory/__mocks__/User.json';

describe('PaginationEtity', () => {
  test('Shoud be list of users', () => {
    const list: Array<User> = [...data.map(UserAdapter.create)];
    const result = PaginationEntityAdapter.createFormMemory(list, { limit: 2 });

    expect(list).toHaveLength(3);
    expect(result.after === data[2].id);
    expect(result.data).toHaveLength(2);
    expect(result.before).toBeUndefined();
  });
});
