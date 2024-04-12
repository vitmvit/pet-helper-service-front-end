import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/entity/user.model";
import {SessionService} from "./session.service";
import {PasswordUpdateDto} from "../model/dto/password.updare.dto";

@Injectable({providedIn: "root"})
export class UserService {

  constructor(private httpClient: HttpClient,
              private sessionService: SessionService) {
  }

  // Метод для получения информации о текущем пользователе
  me(login: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(
      "http://localhost:8080/api/v1/users/" + login,
      this.sessionService.getHeaderToken()
    );
  }

  // Метод для обновления пароля пользователя
  passwordUpdate(dto: PasswordUpdateDto): Observable<UserModel> {
    return this.httpClient.put<UserModel>(
      "http://localhost:8080/api/v1/users/password",
      dto,
      this.sessionService.getHeaderToken()
    );
  }
}
