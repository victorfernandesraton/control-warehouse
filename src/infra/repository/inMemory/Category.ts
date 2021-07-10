import Category from '../../../core/entity/Category';
import CategoryRepository from '../CategoryRepository';
import InMemoryDb from './inMemory';

export default class CategoryRepositoryInMemory
  extends InMemoryDb<Category>
  implements CategoryRepository
{
  createCategory(category: Category): Promise<Category> {
    this.store.push(category);
    return Promise.resolve(category);
  }

  find(category: Category): Promise<Category> {
    return Promise.resolve(
      this.store.find(
        (item: Category) =>
          (item.name === category.name && item.description === category.description) ||
          item.id === category.id
      )
    );
  }
}
