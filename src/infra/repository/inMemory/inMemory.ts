export default class InMemoryDb<T> {
  store: Array<T> = [];
  initialized: Array<T> = [];
  constructor(list?: Array<T>) {
    if (list) {
      this.store = Array.from([...list]);
      this.initialized = Array.from([...list]);
    }
  }

  clearAll(): void {
    this.store = this.initialized;
  }
}
