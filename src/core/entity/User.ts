import BasicEntity from './BasicEntity';
import { UserObjectParams } from '../../adapters/User';
export default class User extends BasicEntity {
  name: string;
  email: string;
  isAdmin: boolean;

  constructor({ name, email, id, isAdmin = false }: UserObjectParams) {
    super(id);
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
  }
}
