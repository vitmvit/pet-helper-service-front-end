export class MessageModel {

  public id: number; // Идентификатор сообщения
  public chatId: number; // Идентификатор чата
  public senderName: string; // Имя отправителя
  public content: string; // Содержимое сообщения
  public createDate: string; // Дата создания сообщения

  constructor(id: number,
              chatId: number,
              senderName: string,
              content: string,
              createDate: string) {
    this.id = id;
    this.chatId = chatId;
    this.senderName = senderName;
    this.content = content;
    this.createDate = createDate;
  }
}
