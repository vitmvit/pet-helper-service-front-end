import {Component, OnInit} from '@angular/core';
import {ChatModel} from "../../../model/entity/chat.model";
import {SessionService} from "../../../service/session.service";
import {ChatService} from "../../../service/chat.service";
import {UserService} from "../../../service/user.service";
import {MenuController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ChatCreateDto} from "../../../model/create/chat.create.dto";

@Component({
  selector: 'app-list-medical-chats',
  templateUrl: './list-medical-chats.page.html',
  styleUrls: ['./list-medical-chats.page.scss'],
})
export class ListMedicalChatsPage implements OnInit {

  chats!: ChatModel[];

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
      }
    });
  }

  // Метод для создания нового чата
  createChat() {
    this.chatService.createChat(new ChatCreateDto("", this.sessionService.getLogin(), "MEDICAL")).subscribe({
      next: (chatModel) => {
        this.router.navigate(['chat', chatModel.id]);
      },
      error: () => {
        // Обработка ошибки
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

  // Метод для открытия меню
  openMenu() {
    this.menu.open("list-chats-menu");
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
