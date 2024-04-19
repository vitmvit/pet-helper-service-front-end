import {Component} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage {

  constructor(private sessionService: SessionService,
              private router: Router
  ) {
  }

  singIn() {
    if (this.sessionService.getToken() != null && this.sessionService.getLogin() != null) {
      this.router.navigateByUrl('home');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  singUp() {
    this.router.navigateByUrl('signup');
  }
}
