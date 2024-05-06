import {Component, OnInit} from '@angular/core';
import {ChatModel} from "../../../model/entity/chat.model";
import {SessionService} from "../../../service/session.service";
import {ChatService} from "../../../service/chat.service";
import {UserService} from "../../../service/user.service";
import {MenuController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ChatCreateDto} from "../../../model/create/chat.create.dto";
import {ErrorModel} from "../../../model/entity/error.model";

@Component({
  selector: 'app-list-medical-chats',
  templateUrl: './list-medical-chats.page.html',
  styleUrls: ['./list-medical-chats.page.scss'],
})
export class ListMedicalChatsPage implements OnInit {

  chats!: ChatModel[];
  errorModel!: ErrorModel | undefined;

  constructor(
    private sessionService: SessionService,
    private chatService: ChatService,
    private userService: UserService,
    private menu: MenuController,
    private router: Router
  ) {
    // Проверка авторизации пользователя
    sessionService.checkLogin();
  }

  ngOnInit() {
    // Получение списка чатов пользователя
    this.chatService.getMyChats(this.sessionService.getLogin()).subscribe({
      next: (chatModel) => {
        this.chats = chatModel
          .filter((chat) => chat.type == "MEDICAL") // Фильтруем чаты по типу MEDICAL
          .sort((a, b) => {
            return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
          });
        this.chats = this.chats.sort((a, b) => b.status.localeCompare(a.status));
      },
      error: (fault) => {
        this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status);
      }
    });
  }

  // Метод для создания нового чата
  createChat() {
    this.chatService.createChat(new ChatCreateDto("", this.sessionService.getLogin(), "MEDICAL")).subscribe({
      next: (chatModel) => {
        this.router.navigate(['chat', chatModel.id]);
      },
      error: (fault) => {
        this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status);
      }
    });
  }

  // Метод для перехода к конкретному чату
  toChat(id: number) {
    this.router.navigate(['chat', id]);
  }

  // Метод для перехода на страницу безопасности
  toSecurity() {
    this.closeMenu();
    this.router.navigateByUrl('security');
  }

  // Метод для перехода к списку чатов
  toSupport() {
    this.closeMenu();
    this.router.navigateByUrl('list-chats');
  }

  // Метод для открытия меню
  openMenu() {
    this.menu.open("list-medical-chats-menu");
  }

  // Метод для закрытия меню
  closeMenu() {
    this.menu.close("list-chats-menu");
  }

  // Метод для выхода из приложения
  logOff() {
    this.closeMenu();
    this.sessionService.clear();
    this.router.navigateByUrl('index');
  }
}
