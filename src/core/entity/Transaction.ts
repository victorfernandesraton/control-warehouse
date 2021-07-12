import BasicEntity from './BasicEntity';
import Item from './Item';
import User from './User';

export enum TransactionEnum {
  Loan,
  Devolution,
  Canceled,
}

export interface TransactionObjectParams {
  id?: string;
  item: Item;
  user: User;
  status?: TransactionEnum;
}

export default class Transaction extends BasicEntity {
  public item: Item;
  public user: User;
  public status: TransactionEnum;

  constructor({ item, user, status, id }: TransactionObjectParams) {
    super(id);
    this.item = item;
    this.user = user;
    this.status = status ?? TransactionEnum.Loan;
  }
}
