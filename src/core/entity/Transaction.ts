import BasicEntity from "./BasicEntity";
import Item from "./Category";
import User from "./User";

export enum TransactionEnum {
  Loan,
  Devolution,
  Canceled,
  Refused,
}

export interface TagObjectParams {
  item: Item;
  user: User;
  status: TransactionEnum;
}

export default class Tag extends BasicEntity {
  public item: Item;
  public user: User;
  public status: TransactionEnum;

  constructor(params: TagObjectParams) {
    super();
    this.item = params.item;
    this.user = params.user;
    this.status = params?.status ?? TransactionEnum.Loan;
  }
}
