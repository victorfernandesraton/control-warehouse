import BasicEntity from '../core/entity/BasicEntity';
import PaginationEntity from '../shared/utils/PaginationEntity';

export interface PaginationEntityOptionsObjectParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  after?: string;
  limit?: number;
}

export abstract class PaginationEntityAdapterStrategy {
  abstract create<T extends BasicEntity>(
    data: Array<T>,
    { after, limit }: PaginationEntityOptionsObjectParams
  ): PaginationEntity<T>;
}

export class PaginationEntityAdapterInMemory extends PaginationEntityAdapterStrategy {
  create<T extends BasicEntity>(
    data: Array<T>,
    { after, limit }: PaginationEntityOptionsObjectParams
  ): PaginationEntity<T> {
    const startsIn = after
      ? data.findIndex((item) => item?.id === after) + 1
      : 0;
    const endsIn = startsIn + limit;

    const listData = data.slice(startsIn, endsIn);

    const head = startsIn > 0 ? listData[0].id : undefined;
    const end =
      listData.length && endsIn < data.length
        ? listData[listData.length - 1].id
        : undefined;

    return new PaginationEntity({
      data: listData,
      before: head,
      after: end,
    });
  }
}
