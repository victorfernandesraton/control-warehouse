import Item from "../../core/entity/Item";
import Transaction from "../../core/entity/Transaction";
import User from "../../core/entity/User";

export default interface ITemTrasactionsInterface {
    createTransaction(user: User, item:Item): Promise<Transaction>
    lastTrasactionState(item:Item): Promise<Transaction | null>
}