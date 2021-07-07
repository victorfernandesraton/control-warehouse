import BasicEntity from "./BasicEntity"

export interface  CategoryObjectParams {
    name: string
    description: string
}

export default class Category extends BasicEntity {
    public name: string
    public description: string

    constructor(params: CategoryObjectParams) {
        super();
        this.name = params.name
        this.description = params.description
    }
}