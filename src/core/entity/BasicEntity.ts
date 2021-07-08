import { v4 } from "uuid";

export default class BasicEntity {
  readonly id: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor() {
    this.id = v4();
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

  public updateEntity() {
    this.updatedAt = new Date(Date.now());
  }
}
