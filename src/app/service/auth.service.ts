import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HeaderService} from "./header.service";
import {TokenModel} from "../model/entity/token.model";
import {SignInModel} from "../model/entity/sign.in.model";
import {ApiService} from "./api.service";

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private headerService: HeaderService,
              private apiService: ApiService) {
  }

  // Метод для выполнения запроса на аутентификацию
  signIn(signInModel: SignInModel): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(
      this.apiService.getApiHost + "/api/v1/auth/signIn", signInModel, this.headerService.getHeaderToken()
    );
  }

  // Метод для выполнения запроса на аутентификацию
  signUp(signUpModel: SignInModel): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(
      this.apiService.getApiHost + "/api/v1/auth/signUp", signUpModel, this.headerService.getHeaderToken()
    );
  }
}
