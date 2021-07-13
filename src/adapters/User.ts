import User from '../core/entity/User';
export interface UserObjectParams {
  id?: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export default class UserAdapter {
  static create({ id, name, email, isAdmin }: UserObjectParams): User {
    return new User({ id, name, email, isAdmin });
  }
}
