export class RecordUpdateDto {

  public id: number;
  public userLogin: string;
  public name: string;
  public breed: string;
  public animalType: string;
  public uuidAvatar: string;
  public dataBirthday: Date;
  public fullName: string;
  public sex: string;
  public description: string;
  public hasPedigree: boolean;

  constructor(id: number,
              userLogin: string,
              name: string,
              breed: string,
              animalType: string,
              uuidAvatar: string,
              dataBirthday: Date,
              fullName: string,
              sex: string,
              description: string,
              hasPedigree: boolean) {
    this.id = id;
    this.userLogin = userLogin;
    this.name = name;
    this.breed = breed;
    this.animalType = animalType;
    this.uuidAvatar = uuidAvatar;
    this.dataBirthday = dataBirthday;
    this.fullName = fullName;
    this.sex = sex;
    this.description = description;
    this.hasPedigree = hasPedigree;
  }
}
