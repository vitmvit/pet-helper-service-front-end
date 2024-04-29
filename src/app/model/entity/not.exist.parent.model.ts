export class NotExistParentModel {

  public id: number;
  public name: string;
  public sex: string;
  public description: string;

  constructor(id: number,
              ownerId: number,
              name: string,
              sex: string,
              description: string
  ) {
    this.id = id;
    this.name = name;
    this.sex = sex;
    this.description = description;
  }
}
