export class PasswordUpdateDto {

  public login: string; // Логин пользователя
  public oldPassword: string; // Старый пароль пользователя
  public newPassword: string; // Новый пароль пользователя
  public confirmPassword: string; // Подтверждение нового пароля

  constructor(login: string,
              oldPassword: string,
              newPassword: string,
              confirmPassword: string) {
    this.login = login;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
