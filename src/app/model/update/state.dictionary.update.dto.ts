export class StateDictionaryUpdateDto {

  public id: number;
  public recordId: number;
  public name: string;
  public isActive: boolean;
  public uuid: string;
  public description: string;

  constructor(
    id: number,
    recordId: number,
              name: string,
              isActive: boolean,
              uuid: string,
              description: string
  ) {
    this.id = id;
    this.recordId = recordId;
    this.name = name;
    this.isActive = isActive;
    this.uuid = uuid;
    this.description = description;
  }
}
