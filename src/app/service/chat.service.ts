import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {ChatModel} from "../model/entity/chat.model";
import {MessageCreateDto} from "../model/create/message.create.dto";
import {ChatCreateDto} from "../model/create/chat.create.dto";
import {ApiService} from "./api.service";


@Injectable({providedIn: "root"})
export class ChatService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  // Получить чаты, связанные с определенным пользователем
  getMyChats(name: string): Observable<ChatModel[]> {
    return this.httpClient.get<ChatModel[]>(
      this.apiService.getApiHost + "/api/v1/chats/userName/" + name,
      this.sessionService.getHeaderToken()
    );
  }

  getMySupportChats(type: string): Observable<ChatModel[]> {
    return this.httpClient.get<ChatModel[]>(
      this.apiService.getApiHost + "/api/v1/chats/type/" + type,
      this.sessionService.getHeaderToken()
    );
  }

  // Получить чат по его идентификатору
  getChatById(id: number): Observable<ChatModel> {
    return this.httpClient.get<ChatModel>(
      this.apiService.getApiHost + "/api/v1/chats/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  // Создать новое сообщение в чате
  createMessage(model: MessageCreateDto): Observable<MessageCreateDto> {
    return this.httpClient.post<MessageCreateDto>(
      this.apiService.getApiHost + "/api/v1/chats/messages", model,
      this.sessionService.getHeaderToken()
    );
  }

  // Создать новый чат
  createChat(model: ChatCreateDto): Observable<ChatModel> {
    return this.httpClient.post<ChatModel>(
      this.apiService.getApiHost + "/api/v1/chats", model,
      this.sessionService.getHeaderToken()
    );
  }
}
