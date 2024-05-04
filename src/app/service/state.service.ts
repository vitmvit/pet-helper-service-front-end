import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {StateDictionaryModel} from "../model/entity/state.dictionary.model";
import {StateDictionaryCreateDto} from "../model/create/state.dictionary.create.dto";
import {StateModel} from "../model/entity/state.model";
import {StateCreateDto} from "../model/create/state.create.dto";
import {StateTemplateModel} from "../model/entity/state.template.model";

@Injectable({providedIn: "root"})
export class StateService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  // Получить записи, связанные с определенным пользователем
  getDictionaries(recordId: number): Observable<StateDictionaryModel[]> {
    return this.httpClient.get<StateDictionaryModel[]>(
      this.apiService.getApiHost + "/api/v1/dictionaries/recordId/" + recordId,
      this.sessionService.getHeaderToken()
    );
  }

  getDictionaryById(id: number): Observable<StateDictionaryModel> {
    return this.httpClient.get<StateDictionaryModel>(
      this.apiService.getApiHost + "/api/v1/dictionaries/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  getStatesByDictionaryId(id: number): Observable<StateModel[]> {
    return this.httpClient.get<StateModel[]>(
      this.apiService.getApiHost + "/api/v1/states/dict/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  getStateTemplates(): Observable<StateTemplateModel[]> {
    return this.httpClient.get<StateTemplateModel[]>(
      this.apiService.getApiHost + "/api/v1/stateTemplates",
      this.sessionService.getHeaderToken()
    );
  }

  // Создать новое сообщение в чате
  createDictionary(model: StateDictionaryCreateDto): Observable<StateDictionaryModel> {
    return this.httpClient.post<StateDictionaryModel>(
      this.apiService.getApiHost + "/api/v1/dictionaries", model,
      this.sessionService.getHeaderToken()
    );
  }

  // Создать новое сообщение в чате
  createState(model: StateCreateDto): Observable<StateModel> {
    return this.httpClient.post<StateModel>(
      this.apiService.getApiHost + "/api/v1/states", model,
      this.sessionService.getHeaderToken()
    );
  }

  // Метод для удаления записи
  deleteDictionary(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiService.getApiHost + "/api/v1/dictionaries/" + id,
      this.sessionService.getHeaderToken()
    );
  }
}