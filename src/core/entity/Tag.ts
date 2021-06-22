import BasicEntity from "./BasicEntity";

export interface TagObjectParams {
    name: string
    description: string
}

export default class Tag extends BasicEntity {
    public name: string
    public description: string

    constructor(params :TagObjectParams){
        super()
        this.name = params.name
        this.description = params.description
    } 
}