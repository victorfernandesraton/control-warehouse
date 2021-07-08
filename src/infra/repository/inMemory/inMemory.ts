export default class InMemoryDb<T> {
  protected store: Array<T> = [];
  protected initialized: Array<T> = [];
  constructor(list?: Array<T>) {
    if (list) {
      this.store = list;
      this.initialized = list;
    }
  }

  clearAll() {
    this.store = this.initialized;
  }
}
