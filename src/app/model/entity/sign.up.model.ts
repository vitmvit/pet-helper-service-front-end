export class SignUpModel {

  public login: string; // Логин пользователя
  public password: string; // Пароль пользователя
  public passwordConfirm: string; // Подтверждение пароля пользователя
  public role: string; // Роль пользователя

  constructor(login: string,
              password: string,
              passwordConfirm: string,
              role: string) {
    this.login = login;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.role = role;
  }
}
