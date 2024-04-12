import {Component, OnInit} from '@angular/core';
import {ErrorModel} from "../../../model/entity/error.model";
import {SessionService} from "../../../service/session.service";
import {AuthService} from "../../../service/auth.service";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SignUpModel} from "../../../model/entity/sign.up.model";

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
              private userService: UserService,
              private router: Router
  ) {
    this.sessionService.clear();
  }

  ngOnInit(): void {
    this.role = "USER"
    this.errorModel = undefined
  }

  singUp() {
    this.errorModel = undefined
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
                this.errorModel = new ErrorModel("Username is exist!", fault2.status);
              }
            });
          }
        } else {
          this.errorModel = new ErrorModel("No access!", 302);
        }
      },
      error: (fault1) => {
        this.errorModel = new ErrorModel("Double check your details!", fault1.status);
      }
    });
    console.log("singIn")
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
