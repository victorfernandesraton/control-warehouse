import BasicEntity from "./BasicEntity"
import Tag from "./Tag";

export interface  ItemObjectParams {
    name: string
    description: string
    tags?: Tag[]
}

export default class Item extends BasicEntity {
    public name: string
    public description: string
    public tags: Tag[]

    constructor(params: ItemObjectParams) {
        super();
        this.name = params.name
        this.description = params.description
    }
}