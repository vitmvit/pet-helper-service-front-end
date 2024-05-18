import {Component, OnInit} from '@angular/core';
import {ErrorModel} from "../../../model/entity/error.model";
import {SessionService} from "../../../service/session.service";
import {AuthService} from "../../../service/auth.service";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SignUpModel} from "../../../model/entity/sign.up.model";
import {ActuatorService} from "../../../service/actuator.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  login!: string;
  password!: string;
  passwordConfirm!: string;
  role!: string;
  errorModel!: ErrorModel | undefined;

  constructor(private sessionService: SessionService,
              private authService: AuthService,
              private actuatorService: ActuatorService,
              private userService: UserService,
              private router: Router
  ) {
    this.actuatorService.getHealthService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })
    this.sessionService.clear();
  }

  ngOnInit(): void {
    this.role = "USER"
    this.errorModel = undefined
  }

  singUp() {
    this.errorModel = undefined
    if (this.password == this.passwordConfirm) {
      this.authService.signUp(new SignUpModel(this.login, this.password, this.passwordConfirm, this.role)).subscribe({
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
                  this.errorModel = new ErrorModel("Такой логин уже существует в системе!", fault2.status);
                }
              });
            }
          } else {
            this.errorModel = new ErrorModel("У вашей роли нет доступа к данному функционалу", 302);
          }
        },
        error: (fault1) => {
          if (fault1.status == 500) {
            this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault1.status);
          } else {
            this.errorModel = new ErrorModel("Такой логин уже существует в системе!", 302);
          }
        }
      });
    } else {
      this.errorModel = new ErrorModel("Пароль и его подтверждение должны совпадать!", 404);
    }
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
