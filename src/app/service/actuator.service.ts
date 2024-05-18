import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({providedIn: "root"})
export class ActuatorService {

  constructor(private http: HttpClient,
              private apiService: ApiService) {
  }

  getHealthService(): Observable<any> {
    return this.http.get(this.apiService.getApiHost + `/actuator/health`);
  }
}
