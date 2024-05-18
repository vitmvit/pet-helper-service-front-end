export class BreedModel {

  public id: number;
  public name: string;
  public animalTypeId: number;

  constructor(id: number,
              name: string,
              animalTypeId: number) {
    this.id = id;
    this.name = name;
    this.animalTypeId = animalTypeId;
  }
}
