import Category from "../../core/entity/Category";

export default interface CategoryRepository {
    createCategory(category: Category)
    find(category: Category)
}