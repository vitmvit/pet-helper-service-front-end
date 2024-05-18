export class EventDictionaryCreateDto {

  public recordId: number;
  public name: string;
  public uuid: string;
  public description: string;

  constructor(recordId: number,
              name: string,
              uuid: string,
              description: string
  ) {
    this.recordId = recordId;
    this.name = name;
    this.uuid = uuid;
    this.description = description;
  }
}
