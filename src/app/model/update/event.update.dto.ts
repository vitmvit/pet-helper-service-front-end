export class EventUpdateDto {

  public id: number;
  public textColor: string;
  public description: string;

  constructor(id: number,
              textColor: string,
              description: string
  ) {
    this.id = id;
    this.textColor = textColor;
    this.description = description;
  }
}
