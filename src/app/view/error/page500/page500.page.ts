import {Component} from '@angular/core';
import {ActuatorService} from "../../../service/actuator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page500',
  templateUrl: './page500.page.html',
  styleUrls: ['./page500.page.scss'],
})
export class Page500Page {

  constructor(
    private actuatorService: ActuatorService,
    private router: Router
  ) {
    actuatorService.getHealthService().subscribe({
      next: () => {
        this.router.navigateByUrl('index');
      }
    })
  }
}
