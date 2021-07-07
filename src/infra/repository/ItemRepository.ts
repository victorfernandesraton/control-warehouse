import Item from '../../core/entity/Item'

export default interface ItemRepository {
    createItem(item: Item)
    find(item: Item)
}