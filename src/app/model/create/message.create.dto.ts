export class MessageCreateDto {

  public chatId: number; // Идентификатор чата, к которому относится сообщение
  public senderName: string; // Имя отправителя сообщения
  public content: string; // Содержание сообщения


  constructor(chatId: number,
              senderName: string,
              content: string) {
    this.chatId = chatId;
    this.senderName = senderName;
    this.content = content;
  }
}
