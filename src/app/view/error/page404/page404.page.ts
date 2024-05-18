import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.page.html',
  styleUrls: ['./page404.page.scss'],
})
export class Page404Page {

  constructor(private router: Router) {
  }

  toHome() {
    this.router.navigateByUrl('home');
  }
}
