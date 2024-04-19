export class ChatCreateDto {

  public supportName: string;
  public userName: string;


  constructor(supportName: string,
              userName: string) {
    this.supportName = supportName;
    this.userName = userName;
  }
}
