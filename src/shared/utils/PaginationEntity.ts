export interface PaginationEntityObjectParams<T> {
  data: Array<T>;
  after?: string | number;
  before?: string | number;
}
export default class PaginationEntity<T> {
  data: Array<T> = [];
  after?: string | number;
  before?: string | number;

  constructor({ data, after, before }: PaginationEntityObjectParams<T>) {
    this.data = data;
    this.after = after;
    this.before = before;
  }
}
