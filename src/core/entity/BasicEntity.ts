import { v4 } from 'uuid';

export default class BasicEntity {
  readonly id: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = v4();
    }
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

  public updateEntity(): void {
    this.updatedAt = new Date(Date.now());
  }
}
