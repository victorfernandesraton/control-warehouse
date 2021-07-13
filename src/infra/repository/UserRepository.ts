import User from '../../core/entity/User';

export default interface UserRepository {
  find(id: string): Promise<User>;
}
