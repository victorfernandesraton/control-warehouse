import BasicEntity from './BasicEntity';

export interface UserObjectParams {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export default class User extends BasicEntity {
  name: string;
  email: string;
  isAdmin: boolean;

  constructor({ name, email, isAdmin = false }: UserObjectParams) {
    super();
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
  }
}
