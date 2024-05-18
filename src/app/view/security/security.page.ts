import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {MenuController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ErrorModel} from "../../model/entity/error.model";
import {UserService} from "../../service/user.service";
import {PasswordUpdateDto} from "../../model/update/password.updare.dto";
import {ActuatorService} from "../../service/actuator.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {

  oldPassword!: string;
  newPassword!: string;
  confirmPassword!: string;

  errorModel!: ErrorModel | undefined;

  public alertButtons = [
    {
      text: 'Отмена',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'Обновить',
      role: 'confirm',
      handler: () => {
        this.updatePassword()
      },
    },
  ];

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private actuatorService: ActuatorService,
              private menu: MenuController,
              private router: Router) {
    this.actuatorService.getHealthService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })

    sessionService.checkLogin();
  }

  ngOnInit(): void {
    this.oldPassword = "";
    this.newPassword = "";
    this.confirmPassword = "";
    this.errorModel = undefined
  }

  updatePassword() {
    this.errorModel = undefined
    if (this.oldPassword != "" && this.newPassword != "" && this.confirmPassword != "") {
      this.userService.passwordUpdate(new PasswordUpdateDto(this.sessionService.getLogin(), this.oldPassword, this.newPassword, this.confirmPassword)).subscribe({
        next: () => {
          this.logOff();
        },
        error: (fault) => {
          if (fault.status == 500) {
            this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status)
          } else {
            this.errorModel = new ErrorModel("Перепроверьте данные!", fault.status)
          }
        }
      });
    } else {
      this.errorModel = new ErrorModel("Необходимо заполнить все поля!", 404)
    }
  }

  toSupport() {
    this.closeMenu()
    this.router.navigateByUrl('list-chats');
  }

  openMenu() {
    this.menu.open("security-menu")
  }

  closeMenu() {
    this.menu.close("security-menu")
  }

  logOff() {
    this.sessionService.clear();
    this.router.navigateByUrl('index');
  }
}
