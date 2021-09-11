import { v4 } from 'uuid';

export default class BasicEntity {
  readonly id: string;
  public createdAt: Date;
  public updatedAt: Date;
  readonly epoch: number;

  constructor(id: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = v4();
    }
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
    this.epoch = new Date(Date.now()).getTime();
  }

  public updateEntity(): void {
    this.updatedAt = new Date(Date.now());
  }
}
