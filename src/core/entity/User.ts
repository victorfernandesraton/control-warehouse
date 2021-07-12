import BasicEntity from './BasicEntity';

export interface UserObjectParams {
  id?: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

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
