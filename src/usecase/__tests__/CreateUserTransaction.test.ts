import Item from "../../core/entity/Item";
import User from "../../core/entity/User";
import {TransactionEnum} from '../../core/entity/Transaction'
import ItemTrasactionsInMemoryRepository from "../../infra/repository/inMemory/ItemTransactions";
import CreateLoanTransaction from "../CreateLoanTrasaction";

describe('CreateUserTransaction', () => {
    const userBasic = new User({
        email: "vfbraton@gmail.com",
        name: "Victor Raton"
    })
    let transactionRepo = new ItemTrasactionsInMemoryRepository();
    beforeEach(() => {
        transactionRepo.cleanAllData()
    })
    test('should be created transaction', async () => {
        const item = new Item({
            name: "Chave de fenda",
            description: "uma chave de fenda"
        })
        const usecase = new CreateLoanTransaction({
            transactionRepo
        })

        const result = await usecase.execute(userBasic, item);
        expect(result.status).toBe(TransactionEnum.Loan);

    });
});