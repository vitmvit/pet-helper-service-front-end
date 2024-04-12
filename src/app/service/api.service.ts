import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({providedIn: "root"})
export class ApiService {

  constructor() {
  }

  get getApiHost(): string {
    return environment.apiHostUrl.toString();
  }
}
