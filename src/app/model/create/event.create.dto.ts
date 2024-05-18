export class EventCreateDto {

  public dictionaryId: number;
  public textColor: string;
  public description: string;
  public dateCreated: string;

  constructor(
    dictionaryId: number,
    textColor: string,
    description: string,
    dateCreated: string
  ) {
    this.dictionaryId = dictionaryId;
    this.textColor = textColor;
    this.description = description;
    this.dateCreated = dateCreated;
  }
}
