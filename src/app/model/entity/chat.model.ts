import {MessageModel} from "./message.model";

export class ChatModel {

  public id: number; // Идентификатор чата
  public supportName: string; // Имя поддержки
  public userName: string; // Имя пользователя
  public messageList: MessageModel[]; // Список сообщений
  public status: string; // Статус чата
  public createDate: string; // Дата создания
  public updateDate: string; // Дата обновления

  constructor(id: number,
              supportName: string,
              userName: string,
              messageList: MessageModel[],
              status: string,
              createDate: string,
              updateDate: string) {
    this.id = id;
    this.supportName = supportName;
    this.userName = userName;
    this.messageList = messageList;
    this.status = status;
    this.createDate = createDate;
    this.updateDate = updateDate;
  }
}
