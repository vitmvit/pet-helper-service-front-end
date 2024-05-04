export class StateModel {

  public id: number;
  public value: number;
  public description: string;
  public dateCreated: string;

  constructor(id: number,
              value: number,
              description: string,
              dateCreated: string) {
    this.id = id;
    this.value = value;
    this.description = description;
    this.dateCreated = dateCreated;
  }
}
