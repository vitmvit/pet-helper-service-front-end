export class StateDictionaryCreateDto {

  public recordId: number;
  public name: string;
  // public isConstant: boolean;
  public uuid: string;
  public description: string;

  constructor(recordId: number,
              name: string,
              // isConstant: boolean,
              uuid: string,
              description: string
  ) {
    this.recordId = recordId;
    this.name = name;
    // this.isConstant = isConstant;
    this.uuid = uuid;
    this.description = description;
  }
}
