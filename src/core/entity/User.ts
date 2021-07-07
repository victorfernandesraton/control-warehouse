import BasicEntity from "./BasicEntity";

export interface UserObjectParams {
  name: string;
  email: string;
}

export default class User extends BasicEntity {
  public name: string;
  public email: string;

  constructor(params: UserObjectParams) {
    super();
    this.name = params.name;
    this.email = params.email;
  }
}
