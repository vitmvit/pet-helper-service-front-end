import {Component} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sessionService: SessionService,
              private router: Router) {
    sessionService.checkLogin();
  }

  toSupport() {
    this.router.navigateByUrl('list-chats');
  }

  logOff() {
    this.sessionService.clear();
    this.router.navigateByUrl('index');
  }
}
