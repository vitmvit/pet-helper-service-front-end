import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {PedigreeModel} from "../model/entity/pedigree.model";
import {PedigreeCreateDto} from "../model/create/pedigree.create";
import {PedigreeUpdateDto} from "../model/update/pedigree.update";

@Injectable({providedIn: "root"})
export class PedigreeService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  getPedigree(id: number): Observable<PedigreeModel> {
    return this.httpClient.get<PedigreeModel>(
      this.apiService.getApiHost + "/api/v1/pedigree/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  getPedigreeByRecordId(id: number): Observable<PedigreeModel> {
    return this.httpClient.get<PedigreeModel>(
      this.apiService.getApiHost + "/api/v1/pedigree/record/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  getPedigreeByOwnerId(id: number): Observable<PedigreeModel[]> {
    return this.httpClient.get<PedigreeModel[]>(
      this.apiService.getApiHost + "/api/v1/pedigree/owner/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  createPedigree(dto: PedigreeCreateDto): Observable<PedigreeModel> {
    return this.httpClient.post<PedigreeModel>(
      this.apiService.getApiHost + "/api/v1/pedigree",
      dto,
      this.sessionService.getHeaderToken()
    );
  }

  updatePedigree(dto: PedigreeUpdateDto): Observable<PedigreeModel> {
    return this.httpClient.put<PedigreeModel>(
      this.apiService.getApiHost + "/api/v1/pedigree",
      dto,
      this.sessionService.getHeaderToken()
    );
  }

  deletePedigree(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiService.getApiHost + "/api/v1/pedigree/" + id,
      this.sessionService.getHeaderToken()
    );
  }
}
