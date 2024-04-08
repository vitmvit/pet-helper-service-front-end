import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {ChatModel} from "../model/entity/chat.model";
import {MessageCreateDto} from "../model/dto/message.create.dto";
import {ChatCreateDto} from "../model/dto/chat.create.dto";


@Injectable({providedIn: "root"})
export class ChatService {

  constructor(private httpClient: HttpClient,
              private sessionService: SessionService) {
  }

  // Получить чаты, связанные с определенным пользователем
  getMyChats(name: string): Observable<ChatModel[]> {
    return this.httpClient.get<ChatModel[]>(
      "http://localhost:8080/api/v1/chats/userName/" + name,
      this.sessionService.getHeaderToken()
    );
  }

  // Получить чат по его идентификатору
  getChatById(id: number): Observable<ChatModel> {
    return this.httpClient.get<ChatModel>(
      "http://localhost:8080/api/v1/chats/" + id,
      this.sessionService.getHeaderToken()
    );
  }

  // Создать новое сообщение в чате
  createMessage(model: MessageCreateDto): Observable<MessageCreateDto> {
    return this.httpClient.post<MessageCreateDto>(
      "http://localhost:8080/api/v1/chats/messages", model,
      this.sessionService.getHeaderToken()
    );
  }

  // Создать новый чат
  createChat(model: ChatCreateDto): Observable<ChatModel> {
    return this.httpClient.post<ChatModel>(
      "http://localhost:8080/api/v1/chats", model,
      this.sessionService.getHeaderToken()
    );
  }
}
