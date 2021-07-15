import ItemAdapter from '../../adapters/Item';
import { TransactionObjectParams } from '../../adapters/Transaction';
import UserAdapter from '../../adapters/User';
import BasicEntity from './BasicEntity';
import Item from './Item';
import User from './User';

export enum TransactionEnum {
  Loan,
  Devolution,
  Canceled,
}

export interface TransactionParams extends TransactionObjectParams {
  item: Item;
  user: User;
}

export default class Transaction extends BasicEntity {
  public item: Item;
  public user: User;
  public status: TransactionEnum;

  constructor({
    item,
    user,
    status,
    id,
    createAt,
    updateAt,
  }: TransactionParams) {
    super(id);
    this.item = item;
    this.user = user;
    this.status = status ?? TransactionEnum.Loan;
    this.createdAt = new Date(createAt) ?? new Date(Date.now());
    this.updatedAt = new Date(updateAt) ?? new Date(Date.now());
  }
}
