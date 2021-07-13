import User from '../../../core/entity/User';
import UserRepository from '../UserRepository';
export default class UserRepostoryInMemory implements UserRepository {
  data: any[] = [
    {
      id: 'd1236519-2124-475a-9c45-fab829ec13ac',
      name: 'Victor Raton',
      email: 'vfbraton@gmail.com',
    },
  ];
  find(id: string): Promise<User> {
    return Promise.resolve(this.data.find((item) => item.id === id));
  }
}
