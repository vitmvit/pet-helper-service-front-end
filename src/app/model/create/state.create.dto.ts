export class StateCreateDto {

  public dictionaryId: number;
  public value: number;
  public description: string;
  public dateCreated: string;

  constructor(
    dictionaryId: number,
    value: number,
    description: string,
    dateCreated: string
  ) {
    this.dictionaryId = dictionaryId;
    this.value = value;
    this.description = description;
    this.dateCreated = dateCreated;
  }
}
