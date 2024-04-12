import {Component} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sessionService: SessionService,
              private menu: MenuController,
              private router: Router) {
    sessionService.checkLogin();
  }

  toSupport() {
    this.closeMenu()
    this.router.navigateByUrl('list-chats');
  }

  toSecurity() {
    this.closeMenu()
    this.router.navigateByUrl('security');
  }

  openMenu() {
    this.menu.open("home-menu")
  }

  closeMenu() {
    this.menu.close("home-menu")
  }

  logOff() {
    this.closeMenu()
    this.sessionService.clear();
    this.router.navigateByUrl('index');
  }
}
