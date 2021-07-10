export default class InMemoryDb<T> {
  store: Array<T> = [];
  initialized: Array<T> = [];
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
