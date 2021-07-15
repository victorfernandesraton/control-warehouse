import BasicEntity from '../core/entity/BasicEntity';
import PaginationEntity, {
  PaginationEntityObjectParams,
} from '../shared/utils/PaginationEntity';

export interface PaginationEntityOptionsObjectParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  after?: string;
  limit?: number;
}

export default class PaginationEntityAdapter {
  static createFormMemory<T extends BasicEntity>(
    data: Array<T>,
    { after, limit }: PaginationEntityOptionsObjectParams
  ): PaginationEntity<T> {
    const startsIn = after ? data.findIndex((item) => item?.id === after) : 0;
    const endsIn = startsIn > 0 ? startsIn + limit + 1 : startsIn + limit;

    const listData = data.slice(
      startsIn > 0 ? startsIn : 0,
      data.length >= endsIn + 1 ? endsIn + 1 : data.length
    );

    const head = after ? data[startsIn > 0 ? startsIn - 1 : 0]?.id : undefined;
    const end = listData.length ? data[endsIn]?.id : undefined;

    return new PaginationEntity({
      data: startsIn > 0 ? listData : listData.slice(0, -1),
      before: end,
      after: head,
    });
  }

  static create<T extends BasicEntity>(
    data: Array<T>,
    { after, before }: PaginationEntityObjectParams<T>
  ): PaginationEntity<T> {
    return new PaginationEntity({ data, after, before });
  }
}
