import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {NotExistParentModel} from "../model/entity/not.exist.parent.model";
import {NotExistParentCreateDto} from "../model/create/not.exist.parent.create.dto";

@Injectable({providedIn: "root"})
export class NotExistParentService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  getParent(id: number): Observable<NotExistParentModel> {
    return this.httpClient.get<NotExistParentModel>(
      this.apiService.getApiHost + "/api/v1/parents/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  createParent(dto: NotExistParentCreateDto): Observable<NotExistParentModel> {
    return this.httpClient.post<NotExistParentModel>(
      this.apiService.getApiHost + "/api/v1/parents",
      dto,
      this.sessionService.getHeaderToken()
    );
  }

  deleteParent(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiService.getApiHost + "/api/v1/parents/" + id,
      this.sessionService.getHeaderToken()
    );
  }
}
