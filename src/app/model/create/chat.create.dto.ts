export class ChatCreateDto {

  public supportName: string;
  public userName: string;
  public type: string;

  constructor(supportName: string,
              userName: string,
              type: string) {
    this.supportName = supportName;
    this.userName = userName;
    this.type = type;
  }
}
