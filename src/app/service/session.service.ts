import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class SessionService {

  private check = "usr_check";
  private token = "usr_token";
  private login = "usr_login";
  private time = 1000 * 60 * 60 * 24;
  private path = "/";

  constructor(private cookieService: CookieService,
              private router: Router,
              private httpClient: HttpClient
  ) {
  }

  //---

  getToken(): string {
    return this.getParam(this.token);
  }

  setToken(token: string): void {
    if (!this.cookieService.check(this.token)) {
      this.setParam(this.token, token);
    }
  }

  getLogin(): string {
    return this.getParam(this.login);
  }

  setLogin(login: string): void {
    if (!this.cookieService.check(this.login)) {
      this.setParam(this.login, login);
    }
  }

  //---

  clear() {
    if (this.cookieService.check(this.login)) {
      this.cookieService.delete(this.login, "/");
    }
    if (this.cookieService.check(this.token)) {
      this.cookieService.delete(this.token, "/");
    }
    this.cookieService.delete(this.check);
  }

  /**
   * проверка куков, если не удалось записать и считать
   * то редиректим на страницу предупреждения о необходимости кукис
   */
  checkCookies() {
    this.cookieService.set(this.check, this.check, this.time, this.path);
    if (this.cookieService.check(this.check)) {
      this.cookieService.delete(this.check);
    } else {
      // this.router.navigateByUrl("cookie");
    }
  }

  checkLogin() {
    if (!this.cookieService.check(this.login) || !this.cookieService.check(this.token)) {
      this.logOff();
    }
  }

  checkSession() {
    if (!this.cookieService.check(this.login) || !this.cookieService.check(this.token)) {
      this.logOff();
    }
    if (this.cookieService.check(this.login) && this.cookieService.check(this.token)) {
      this.checkCurrentLogin(this.cookieService.get(this.login)).subscribe(response => {
        if (!response) {
          this.logOff();
        }
      });
    }
  }

  logOff() {
    //this.cookieService.delete(this.check, "/");
    this.cookieService.delete(this.login, "/");
    this.cookieService.delete(this.token, "/");
    this.router.navigateByUrl("index");
  }

  //---

  // @ts-ignore
  getParam(key: string): string {
    if (this.cookieService.check(key)) {
      return this.cookieService.get(key);
    } else {
      this.router.navigateByUrl("login");
    }
  }

  setParam(key: string, value: string): void {
    if (!this.cookieService.check(key)) {
      this.cookieService.set(key, value, this.time, this.path);
    }
  }

  checkCurrentLogin(login: string): Observable<boolean> {
    // @ts-ignore
    return this.httpClient.get<boolean>(
      "/users/current?login=" + login,
      this.getHeaderToken()
    );
  }

  getHeader(): object {
    return {
      headers: new HttpHeaders()
        .set("Accept", "*/*")
        .set("Content-type", "application/json; charset=utf-8")
        .set("Access-Control-Allow-Origin", "*")
        .set("Access-Control-Allow-Methods", "OPTIONS, POST, PUT, GET, DELETE, PATCH")
        .set("Access-Control-Allow-Headers", "*")
        .set("Access-Control-Allow-Credentials", "true")
    };
  }

  getHeaderToken(): object {
    return {
      headers: new HttpHeaders()
        // .set("Accept", "*/*")
        // .set("Content-type", "application/json; charset=utf-8")
        // .set("Access-Control-Allow-Origin", "*")
        // .set("Access-Control-Allow-Methods", "OPTIONS, POST, PUT, GET, DELETE, PATCH")
        // .set("Access-Control-Allow-Headers", "*")
        // .set("Access-Control-Allow-Credentials", "true")
        .set("Authorization", "Bearer " + this.getToken())
    };
  }
}
