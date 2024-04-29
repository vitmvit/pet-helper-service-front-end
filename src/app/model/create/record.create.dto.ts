export class RecordCreateDto {

  public userLogin: string;
  public name: string;
  public uuidAvatar: string;
  public dataBirthday: string;
  public fullName: string;
  public sex: string;
  public description: string;

  constructor(userLogin: string,
              name: string,
              uuidAvatar: string,
              dataBirthday: string,
              fullName: string,
              sex: string,
              description: string) {
    this.userLogin = userLogin;
    this.name = name;
    this.uuidAvatar = uuidAvatar;
    this.dataBirthday = dataBirthday;
    this.fullName = fullName;
    this.sex = sex;
    this.description = description;
  }
}
