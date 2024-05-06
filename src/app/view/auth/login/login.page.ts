import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {AuthService} from "../../../service/auth.service";
import {SignInModel} from "../../../model/entity/sign.in.model";
import {JwtHelperService} from '@auth0/angular-jwt';
import {ErrorModel} from "../../../model/entity/error.model";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login!: string;
  password!: string;
  errorModel!: ErrorModel | undefined;

  constructor(private sessionService: SessionService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.errorModel = undefined
  }

  singIn() {
    this.errorModel = undefined
    this.authService.signIn(new SignInModel(this.login, this.password)).subscribe({
      next: (tokenModel) => {
        // Получение роли из токена
        const role = this.getRoleInToken(tokenModel.accessToken)
        if (role == 'USER') {
          // Получение логина из токена
          const login = this.getLoginInToken(tokenModel.accessToken)
          if (login == this.login) {
            this.sessionService.setToken(tokenModel.accessToken);
            this.userService.me(login).subscribe({
              next: (user) => {
                if (user !== undefined) {
                  this.sessionService.setLogin(user.login);
                  this.router.navigateByUrl('home');
                }
              },
              error: (fault2) => {
                this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault2.status);
              }
            });
          } else {
            this.errorModel = new ErrorModel("Перепроверьте введенные данные!", 404);
          }
        } else {
          this.errorModel = new ErrorModel("У вашей роли нет доступа к данному функционалу", 302);
        }
      },
      error: (fault1) => {
        if (fault1.status == 500) {
          this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault1.status);
        } else {
          this.errorModel = new ErrorModel("Перепроверьте введенные данные!", 404);
        }
      }
    });
  }

  // Метод для получения логина из JWT-токена
  getLoginInToken(tkn: string): string {
    const helper = new JwtHelperService();
    const jsonToken = JSON.stringify(helper.decodeToken(tkn));
    const jsonParse = JSON.parse(jsonToken);
    const sub = jsonParse["sub"];
    return sub == null ? "" : sub;
  }

  // Метод для получения роли из JWT-токена
  getRoleInToken(tkn: string): string {
    const helper = new JwtHelperService();
    const jsonToken = JSON.stringify(helper.decodeToken(tkn))
    const jsonParse = JSON.parse(jsonToken)
    return jsonParse["role"]
  }
}
