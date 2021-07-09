import { TransactionEnum } from "../../core/entity/Transaction";
import Category from "../../core/entity/Category";
import Item from "../../core/entity/Item";
import Storage, { StorageStatusEnum } from "../../core/entity/Storage";
import User from "../../core/entity/User";

import CategoryRepositoryInMemory from "../../infra/repository/inMemory/Category";
import ItemRepositoryInMemory from "../../infra/repository/inMemory/Item";
import ItemTrasactionsInMemoryRepository from "../../infra/repository/inMemory/ItemTransactions";
import StorageRepositoryInMemory from "../../infra/repository/inMemory/storageRepository";

import CreateLoanTransaction from "../CreateLoanTrasaction";

describe("CreateUserTransaction", () => {
  const userBasic = new User({
    email: "vfbraton@gmail.com",
    name: "Victor Raton",
  });
  const transactionRepo = new ItemTrasactionsInMemoryRepository();
  const categoryRepository = new CategoryRepositoryInMemory([
    new Category({
      name: "resistor",
      description: "dispositivio resistivo",
    }),
    new Category({
      name: "chave de fenda",
      description: "conjunto de chaves",
    }),
  ]);
  const itemRepository = new ItemRepositoryInMemory();
  const storageRepository = new StorageRepositoryInMemory([
    new Storage({ name: "Caixa 1", description: "Caixa de ferramentas 1" }),
    new Storage({ name: "Caixa 2", description: "Caixa de ferramentas 2" }),
  ]);
  beforeEach(() => {
    transactionRepo.cleanAllData();
  });
  test("should be created transaction", async () => {
    const usecase = new CreateLoanTransaction({
      transactionRepo,
      categoryRepository,
      storageRepository,
    });
    const item = new Item({
      name: "Chave de fenda",
      description: "uma chave de fenda",
      category: new Category({
        name: "chave de fenda",
        description: "conjunto de chaves",
      }),
      storage: new Storage({
        name: "Caixa 1",
        description: "Caixa de ferramentas 1",
      }),
    });

    const result = await usecase.execute(userBasic, item);
    expect(result.status).toBe(TransactionEnum.Loan);
  });
});
