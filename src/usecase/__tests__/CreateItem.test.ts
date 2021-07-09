import Category from "../../core/entity/Category";
import Item from "../../core/entity/Item";
import Storage from "../../core/entity/Storage";
import CategoryRepositoryInMemory from "../../infra/repository/inMemory/Category";
import ItemRepositoryInMemory from "../../infra/repository/inMemory/Item";
import StorageRepositoryInMemory from "../../infra/repository/inMemory/storageRepository";
import CreateItem from "../CreateItem";

describe("CreateItem", () => {
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
    itemRepository.clearAll();
    categoryRepository.clearAll();
    storageRepository.clearAll();
  });

  test("should be create item", async () => {
    const createdItem = new CreateItem({
      categoryRepository,
      itemRepository,
      storageRepository,
    });

    const item = await createdItem.execute(
      new Item({
        name: "Chave de fenda n5",
        category: new Category({
          name: "chave de fenda",
          description: "conjunto de chaves",
        }),
        storage: new Storage({
          name: "Caixa 1",
          description: "Caixa de ferramentas 1",
        }),
        tag: ["cahev de fenda", "item de eletricista"],
      })
    );
    expect(item.id).not.toBeNull();
    expect(item.tag).toHaveLength(2);
  });
  test("Shoud not be createItem because storage is full", async () => {
    expect.assertions(1);

    const usecase = new CreateItem({
      categoryRepository,
      itemRepository,
      storageRepository,
    });

    const storage = new Storage({
      name: "Caixa de parafusos",
      description: "Caixa para guardar parafuso",
      capacity: 0,
    });
    const category = new Category({
      name: "Parafuso",
      description: "Parafusos",
    });

    categoryRepository.createCategory(category);
    storageRepository.createStorage(storage);

    const item = new Item({
      name: "Parafuso",
      description: "Parafuso tamanho n",
      storage,
      category,
    });

    await expect(usecase.execute(item)).rejects.toThrowError(
      "storage is not avaliable"
    );
  });
});
