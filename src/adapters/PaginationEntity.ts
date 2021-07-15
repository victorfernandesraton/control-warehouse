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
    const startsIn = data.findIndex((item) => item?.id === after) ?? 0;
    const endsIn = startsIn + limit;
    const listData = data.slice(
      startsIn > 0 ? startsIn - 1 : 0,
      data.length > endsIn + 2 ? endsIn + 2 : data.length
    );

    const [head, ...finalData] = listData;
    const end =
      data.length === endsIn ? undefined : finalData.slice(-1)?.[0]?.id;

    return new PaginationEntity({
      data: startsIn > -1 ? finalData : listData.slice(0, -1),
      before: startsIn > 0 ? head?.id : undefined,
      after: end,
    });
  }

  static create<T extends BasicEntity>(
    data: Array<T>,
    { after, before }: PaginationEntityObjectParams<T>
  ): PaginationEntity<T> {
    return new PaginationEntity({ data, after, before });
  }
}
