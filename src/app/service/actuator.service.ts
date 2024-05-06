import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class ActuatorService {

  constructor(private http: HttpClient) { }

  getHealthService(): Observable<any> {
    return this.http.get(`http://localhost:8080/actuator/health`);
  }

  getHealthImageService(): Observable<any> {
    return this.http.get(`http://localhost:8086/actuator/health`);
  }

  getHealthAuthService(): Observable<any> {
    return this.http.get(`http://localhost:8082/actuator/health`);
  }

  getHealthMessageService(): Observable<any> {
    return this.http.get(`http://localhost:8084/actuator/health`);
  }

  getHealthPetHelperService(): Observable<any> {
    return this.http.get(`http://localhost:8085/actuator/health`);
  }
}
