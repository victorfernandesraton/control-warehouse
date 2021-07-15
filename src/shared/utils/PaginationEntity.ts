export interface PaginationEntityObjectParams<T> {
  data: Array<T>;
  after?: string;
  before?: string;
}
export default class PaginationEntity<T> {
  data: Array<T> = [];
  after?: string;
  before?: string;

  constructor({ data, after, before }: PaginationEntityObjectParams<T>) {
    this.data = data;
    this.after = after;
    this.before = before;
  }
}
