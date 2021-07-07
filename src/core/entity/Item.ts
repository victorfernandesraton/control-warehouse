import BasicEntity from "./BasicEntity"
import Category from "./Category";
export interface  ItemObjectParams {
    name: string
    description?: string
    category: Category
    tag?: string[]
}

export default class Item extends BasicEntity {
    public name: string
    public description?: string
    public category: Category
    public tag: string[]

    constructor({name, description}: ItemObjectParams) {
        super();
        this.name = name
        this.description = description
    }
}