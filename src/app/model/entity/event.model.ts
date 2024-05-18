export class EventModel {

  public id: number;
  public textColor: string;
  public description: string;
  public dateCreated: string;
  public dictionaryId: number;

  constructor(id: number,
              textColor: string,
              description: string,
              dateCreated: string,
              dictionaryId: number) {
    this.id = id;
    this.textColor = textColor;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dictionaryId = dictionaryId;
  }
}
