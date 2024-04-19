import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {ApiService} from "./api.service";
import {RecordModel} from "../model/entity/record.model";
import {RecordCreateDto} from "../model/dto/record.create.dto";
import {RecordUpdateDto} from "../model/dto/record.update.dto";

@Injectable({providedIn: "root"})
export class RecordService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  // Получить записи, связанные с определенным пользователем
  getMyRecords(login: string): Observable<RecordModel[]> {
    return this.httpClient.get<RecordModel[]>(
      this.apiService.getApiHost + "/api/v1/records/user/" + login,
      this.sessionService.getHeaderToken()
    );
  }

  getRecordById(id: number): Observable<RecordModel> {
    return this.httpClient.get<RecordModel>(
      this.apiService.getApiHost + "/api/v1/records/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  createRecord(recordCreateDto: RecordCreateDto): Observable<RecordModel> {
    return this.httpClient.post<RecordModel>(
      this.apiService.getApiHost + "/api/v1/records",
      recordCreateDto,
      this.sessionService.getHeaderToken()
    );
  }

  updateRecord(recordUpdateDto: RecordUpdateDto): Observable<RecordModel> {
    return this.httpClient.put<RecordModel>(
      this.apiService.getApiHost + "/api/v1/records",
      recordUpdateDto,
      this.sessionService.getHeaderToken()
    );
  }

  updateAvatarUuid(id: number, uuid: string): Observable<RecordModel> {
    return this.httpClient.put<RecordModel>(
      this.apiService.getApiHost + "/api/v1/records/avatar/" + id + "/" + uuid,
      this.sessionService.getHeaderToken()
    );
  }

  // Метод для удаления записи
  deleteRecord(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiService.getApiHost + "/api/v1/records/" + id,
      this.sessionService.getHeaderToken()
    );
  }
}
