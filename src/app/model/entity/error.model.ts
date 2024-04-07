export class ErrorModel {

  public message: string; // Сообщение об ошибке
  public status: number; // Код статуса ошибки

  constructor(message: string,
              status: number) {
    this.message = message;
    this.status = status;
  }
}
