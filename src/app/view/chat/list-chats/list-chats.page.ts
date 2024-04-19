import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {Router} from "@angular/router";
import {ChatService} from "../../../service/chat.service";
import {ChatModel} from "../../../model/entity/chat.model";
import {UserService} from "../../../service/user.service";
import {ChatCreateDto} from "../../../model/dto/chat.create.dto";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.page.html',
  styleUrls: ['./list-chats.page.scss'],
})
export class ListChatsPage implements OnInit {

  chats!: ChatModel[];

  constructor(private sessionService: SessionService,
              private chatService: ChatService,
              private userService: UserService,
              private menu: MenuController,
              private router: Router) {
    sessionService.checkLogin();
  }

  ngOnInit() {
    // Получение списка чатов пользователя
    this.chatService.getMyChats(this.sessionService.getLogin()).subscribe({
      next: (chatModel) => {
        this.chats = chatModel.sort((a, b) => {
          return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
        });
        this.chats = this.chats.sort((a, b) => b.status.localeCompare(a.status));
      }
    });
  }

  createChat() {
    this.chatService.createChat(new ChatCreateDto("", this.sessionService.getLogin())).subscribe({
      next: (chatModel) => {
        this.router.navigate(['chat', chatModel.id]);
      },
      error: () => {
      }
    });
  }

  toChat(id: number) {
    this.router.navigate(['chat', id]);
  }

  toSecurity() {
    this.closeMenu()
    this.router.navigateByUrl('security');
  }

  openMenu() {
    this.menu.open("list-chats-menu")
  }

  closeMenu() {
    this.menu.close("list-chats-menu")
  }

  logOff() {
    this.closeMenu()
    this.sessionService.clear();
    this.router.navigateByUrl('index');
  }
}
