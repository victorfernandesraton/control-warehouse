import Item from "../core/entity/Category";
import Transaction ,{ TransactionEnum } from "../core/entity/Transaction";
import User from "../core/entity/User";
import ITemTrasactionsInterface from "../infra/repository/ItemTrasactions";

export interface CreateLoanTransactionObjectParams {
    transactionRepo: ITemTrasactionsInterface
}

export default class CreateLoanTransaction {
    private transactionRepo: ITemTrasactionsInterface
    constructor(params: CreateLoanTransactionObjectParams) {
        this.transactionRepo = params.transactionRepo
    }

    async execute(user: User, item: Item): Promise<Transaction> {
        const isBeenLoan = await this.transactionRepo.lastTrasactionState(item);
        if ([TransactionEnum.Loan].includes(isBeenLoan?.status)) {
            throw new Error("cannot create Item Transaction when item is in Loan")
        }
        const result = await this.transactionRepo.createTransaction(user, item)

        return result;
    }
}