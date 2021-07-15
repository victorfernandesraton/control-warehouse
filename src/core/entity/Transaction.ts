import { TransactionObjectParams } from '../../adapters/Transaction';
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
    createdAt,
    updatedAt,
  }: TransactionParams) {
    super(id);
    this.item = item;
    this.user = user;
    this.status = status ?? TransactionEnum.Loan;
    this.createdAt = createdAt
      ? typeof createdAt === 'string'
        ? new Date(Date.parse(createdAt))
        : createdAt
      : new Date(Date.now());
    this.updatedAt = updatedAt
      ? typeof updatedAt === 'string'
        ? new Date(Date.parse(updatedAt))
        : updatedAt
      : new Date(Date.now());
  }
}
