import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {StateDictionaryModel} from "../model/entity/state.dictionary.model";
import {StateDictionaryUpdateDto} from "../model/update/state.dictionary.update.dto";
import {EventDictionaryModel} from "../model/entity/event.dictionary.model";
import {EventModel} from "../model/entity/event.model";
import {EventDictionaryCreateDto} from "../model/create/event.dictionary.create.dto";
import {EventCreateDto} from "../model/create/event.create.dto";

@Injectable({providedIn: "root"})
export class EventService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  getDictionaries(recordId: number): Observable<EventDictionaryModel[]> {
    return this.httpClient.get<EventDictionaryModel[]>(
      this.apiService.getApiHost + "/api/v1/eventDictionaries/recordId/" + recordId,
      this.sessionService.getHeaderToken()
    );
  }

  getDictionaryById(id: number): Observable<EventDictionaryModel> {
    return this.httpClient.get<EventDictionaryModel>(
      this.apiService.getApiHost + "/api/v1/eventDictionaries/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  getEventsByDictionaryId(id: number): Observable<EventModel[]> {
    return this.httpClient.get<EventModel[]>(
      this.apiService.getApiHost + "/api/v1/events/dict/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  createDictionary(model: EventDictionaryCreateDto): Observable<EventDictionaryModel> {
    return this.httpClient.post<EventDictionaryModel>(
      this.apiService.getApiHost + "/api/v1/eventDictionaries", model,
      this.sessionService.getHeaderToken()
    );
  }

  createEvent(model: EventCreateDto): Observable<EventModel> {
    return this.httpClient.post<EventModel>(
      this.apiService.getApiHost + "/api/v1/events", model,
      this.sessionService.getHeaderToken()
    );
  }

  updateDictionary(model: StateDictionaryUpdateDto): Observable<StateDictionaryModel> {
    return this.httpClient.put<StateDictionaryModel>(
      this.apiService.getApiHost + "/api/v1/eventDictionaries", model,
      this.sessionService.getHeaderToken()
    );
  }

  deleteDictionary(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiService.getApiHost + "/api/v1/eventDictionaries/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiService.getApiHost + "/api/v1/events/" + id,
      this.sessionService.getHeaderToken()
    );
  }
}
