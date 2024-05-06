import {Component} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {Router} from "@angular/router";
import {ActuatorService} from "../../service/actuator.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage {

  constructor(private sessionService: SessionService,
              private actuatorService: ActuatorService,
              private router: Router
  ) {
    actuatorService.getHealthService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })
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
