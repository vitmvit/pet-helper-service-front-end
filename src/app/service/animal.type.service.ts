import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {AnimalTypeModel} from "../model/entity/animal.type.model";

@Injectable({providedIn: "root"})
export class AnimalTypeService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  getAnimalTypes(): Observable<AnimalTypeModel[]> {
    return this.httpClient.get<AnimalTypeModel[]>(
      this.apiService.getApiHost + "/api/v1/animalTypes",
      this.sessionService.getHeaderToken()
    );
  }
}
