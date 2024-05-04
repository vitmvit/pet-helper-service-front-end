export class StateTemplateModel {

  public id: number;
  public name: string;
  public description: string;
  public uuidImage: string;

  constructor(id: number,
              name: string,
              description: string,
              uuidImage: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.uuidImage = uuidImage;
  }
}
