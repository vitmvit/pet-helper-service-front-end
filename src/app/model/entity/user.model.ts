export class UserModel {

  public id: string; // Идентификатор пользователя
  public login: string; // Логин пользователя
  public password: string; // Пароль пользователя
  public role: string; // Роль пользователя
  public createDate: string; // Дата создания пользователя
  public lastVisit: string; // Последнее посещение пользователем

  constructor(id: string,
              login: string,
              password: string,
              role: string,
              createDate: string,
              lastVisit: string) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.createDate = createDate;
    this.role = role;
    this.lastVisit = lastVisit;
  }
}
