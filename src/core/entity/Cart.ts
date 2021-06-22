import BasicEntity from "./BasicEntity";

export interface CartObjectParams {
    name: string
    description: string
    isActive?: boolean
}

export default class Cart extends BasicEntity {
    public name: string
    public description: string
    public isActive : boolean = true

    constructor(params :CartObjectParams){
        super()
        this.name = params.name
        this.description = params.description
        this.isActive = params?.isActive ?? this.isActive
    } 
}