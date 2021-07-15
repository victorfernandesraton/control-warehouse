import Transaction, { TransactionEnum } from '../core/entity/Transaction';
import ItemAdapter, { ItemObjectParams } from './Item';
import UserAdapter, { UserObjectParams } from './User';

export interface TransactionObjectParams {
  item: ItemObjectParams;
  user: UserObjectParams;
  status: TransactionEnum;
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export default class TransactionAdapter {
  static create({
    item,
    user,
    status,
    id,
    createdAt,
    updatedAt,
  }: TransactionObjectParams): Transaction {
    const newItem = ItemAdapter.create(item);
    const newUser = UserAdapter.create(user);
    return new Transaction({
      item: newItem,
      user: newUser,
      status,
      id,
      createdAt,
      updatedAt,
    });
  }
}
