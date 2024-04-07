export class SignInModel {

  public login: string; // Логин пользователя
  public password: string; // Пароль пользователя

  constructor(login: string,
              password: string) {
    this.login = login;
    this.password = password;
  }
}
