import Category from "../../core/entity/Category";

export default interface CategoryRepository {
  createCategory(category: Category): Promise<Category>;
  find(category: Category): Promise<Category>;
}
