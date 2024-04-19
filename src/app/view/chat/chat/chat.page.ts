import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {ChatService} from "../../../service/chat.service";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageModel} from "../../../model/entity/message.model";
import {ChatModel} from "../../../model/entity/chat.model";
import {MessageCreateDto} from "../../../model/dto/message.create.dto";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  id!: number;
  currentChat!: ChatModel;
  listMessages!: MessageModel[];
  currentUsername!: string;
  currentSupport!: string;
  newMessage!: string;
  closedMessage!: string;

  private refreshIntervalId: any;

  constructor(private sessionService: SessionService,
              private chatService: ChatService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    sessionService.checkLogin()
    route.params.subscribe(params => this.id = params["id"]);
  }

  ngOnInit() {
    this.closedMessage = ""
    this.newMessage = ""
    this.getChat();

    // Устанавливаем интервал обновления каждую секунду
    this.refreshIntervalId = setInterval(() => {
      this.getChat();
    }, 1000);
  }

  // Получение чата по идентификатору
  getChat() {
    this.chatService.getChatById(this.id).subscribe({
      next: (chatModel) => {
        this.listMessages = chatModel.messageList
        this.currentUsername = chatModel.userName
        this.currentSupport = chatModel.supportName
        this.currentChat = chatModel

        this.listMessages = chatModel.messageList.sort((a, b) => {
          return new Date(a.createDate).getTime() - new Date(b.createDate).getTime();
        });

        if (this.currentChat.status == "CLOSED") {
          this.closedMessage = "Данный диалог завершен!"
        }
      }
    });
  }

  // Создание сообщения
  createMessage() {
    if (this.currentChat.status != "CLOSED") {
      if (this.newMessage != "") {
        this.chatService.createMessage(new MessageCreateDto(this.currentChat.id, this.sessionService.getLogin(), this.newMessage)).subscribe({
          next: (newMessage) => {
            this.newMessage = ""
            this.getChat();
          }
        });
      }
    }
  }

  toChats() {
    this.router.navigateByUrl('list-chats');
  }
}
