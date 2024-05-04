export class StateUpdateDto {

  public id: number;
  public value: number;
  public description: string;

  constructor(id: number,
              value: number,
              description: string
  ) {
    this.id = id;
    this.value = value;
    this.description = description;
  }
}
