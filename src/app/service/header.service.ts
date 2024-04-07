import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {SessionService} from "./session.service";

@Injectable({providedIn: "root"})
export class HeaderService {

  constructor(private sessionService: SessionService) {
  }

  // Возвращает объект с заголовками для HTTP-запроса
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

  // Возвращает объект с заголовком токена доступа для HTTP-запроса
  getHeaderToken(): object {
    return {
      headers: new HttpHeaders()
        // .set("Accept", "*/*")
        // .set("Content-type", "application/json; charset=utf-8")
        // .set("Access-Control-Allow-Origin", "*")
        // .set("Access-Control-Allow-Methods", "OPTIONS, POST, PUT, GET, DELETE, PATCH")
        // .set("Access-Control-Allow-Headers", "*")
        // .set("Access-Control-Allow-Credentials", "true")
        .set("Authorization", "Bearer " + this.sessionService.getToken())
    };
  }
}
