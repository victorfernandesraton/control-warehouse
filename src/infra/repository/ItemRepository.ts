import Item from '../../core/entity/Item'

export default interface ItemRepository {
    createItem(item: Item): Promise<Item | null>
    find(item: Item): Promise<Item[] | null>
}