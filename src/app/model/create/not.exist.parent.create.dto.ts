export class NotExistParentCreateDto {

  public name: string;
  public sex: string;
  public description: string;

  constructor(name: string,
              sex: string,
              description: string
  ) {
    this.name = name;
    this.sex = sex;
    this.description = description;
  }
}
