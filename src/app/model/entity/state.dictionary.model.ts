export class StateDictionaryModel {

  public id: number;
  public recordId: number;
  public name: string;
  public active: boolean;
  public isConstant: boolean;
  public uuid: string;
  public description: string;
  public dateCreated: string;

  constructor(id: number,
              recordId: number,
              name: string,
              active: boolean,
              isConstant: boolean,
              uuid: string,
              description: string,
              dateCreated: string) {
    this.id = id;
    this.recordId = recordId;
    this.name = name;
    this.active = active;
    this.isConstant = isConstant;
    this.uuid = uuid;
    this.description = description;
    this.dateCreated = dateCreated;
  }
}
