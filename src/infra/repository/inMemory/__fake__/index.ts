import Category from '../../../../core/entity/Category';
import Storage from '../../../../core/entity/Storage';
import Item from '../../../../core/entity/Item';
import User from '../../../../core/entity/User';
import Transaction from '../../../../core/entity/Transaction';

export const categpries = [
  new Category({
    name: 'chave de fenda',
    description: 'conjunto de chaves',
    uniqueName: 'CHAVE_DE_FENDA',
  }),
  new Category({
    name: 'resistor',
    description: 'dispositivio resistivo',
    uniqueName: 'RESISTOR',
  }),
];
export const storages = [
  new Storage({ name: 'Caixa 1', description: 'Caixa de ferramentas 1' }),
  new Storage({ name: 'Caixa 2', description: 'Caixa de ferramentas 2' }),
];

export const items = [
  new Item({
    name: 'Parafuso',
    description: 'Parafuso tamanho n',
    storage: storages[0],
    category: categpries[0],
  }),
  new Item({
    name: 'Chave de fenda n5',
    category: categpries[1],
    storage: storages[1],
    tag: ['cahev de fenda', 'item de eletricista'],
  }),
];

export const userBasic = new User({
  email: 'vfbraton@gmail.com',
  name: 'Victor Raton',
});
export const userBasicAdmin = new User({
  email: 'victor@gmail.com',
  name: 'Victor Fernandes',
  isAdmin: true,
});

export const transactions = [
  new Transaction({
    item: items[0],
    user: userBasic,
  }),
  new Transaction({
    item: items[1],
    user: userBasic,
  }),
];
