import BasicEntity from './BasicEntity';
import Item from './Item';
import User from './User';

export enum TransactionEnum {
  Loan,
  Devolution,
  Canceled,
}

export interface TransactionObjectParams {
  item: Item;
  user: User;
  status?: TransactionEnum;
}

export default class Transaction extends BasicEntity {
  public item: Item;
  public user: User;
  public status: TransactionEnum;

  constructor(params: TransactionObjectParams) {
    super();
    this.item = params.item;
    this.user = params.user;
    this.status = params?.status ?? TransactionEnum.Loan;
  }
}
