export class StateDictionaryUpdateDto {

  public recordId: number;
  public name: string;
  public isActive: boolean;
  public uuid: string;
  public description: string;

  constructor(recordId: number,
              name: string,
              isActive: boolean,
              uuid: string,
              description: string
  ) {
    this.recordId = recordId;
    this.name = name;
    this.isActive = isActive;
    this.uuid = uuid;
    this.description = description;
  }
}
