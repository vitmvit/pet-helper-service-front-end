import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {BreedModel} from "../model/entity/breed.model";

@Injectable({providedIn: "root"})
export class BreedService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  getBreedByAnimalTypeId(id: number): Observable<BreedModel[]> {
    return this.httpClient.get<BreedModel[]>(
      this.apiService.getApiHost + "/api/v1/breeds/type/" + id,
      this.sessionService.getHeaderToken()
    );
  }
}
