import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuController} from "@ionic/angular";
import {RecordService} from "../../service/record.service";
import {RecordModel} from "../../model/entity/record.model";
import {ErrorModel} from "../../model/entity/error.model";
import {ActuatorService} from "../../service/actuator.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  input!: string;
  reload!: string;
  listRecords!: RecordModel[];
  errorModel!: ErrorModel | undefined;

  constructor(private sessionService: SessionService,
              private menu: MenuController,
              private recordService: RecordService,
              private actuatorService: ActuatorService,
              private router: Router,
              private route: ActivatedRoute) {
    this.actuatorService.getHealthService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })

    sessionService.checkLogin();
    route.params.subscribe(params => {
      this.reload = params["reload"];
      this.getMyRecords();
    });
  }

  ngOnInit(): void {
    this.errorModel = undefined
    // Получение списка записей при инициализации компонента
    this.getMyRecords();
  }

  // Метод для получения списка записей пользователя
  getMyRecords() {
    this.errorModel = undefined
    if (this.input) {
      // Если есть введенное значение поиска, фильтруем записи по названию
      this.listRecords = this.listRecords.filter(record => record.name.includes(this.input));
    } else {
      // Если нет введенного значения поиска, получаем все записи пользователя
      this.recordService.getMyRecords(this.sessionService.getLogin()).subscribe({
        next: (listRecord) => {
          this.listRecords = listRecord.sort((a, b) => {
            return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
          });
        },
        error: (fault) => {
          this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status);
        }
      });
    }
  }

  // Метод для перехода к созданию новой записи
  toCreateRecord() {
    this.closeMenu();
    this.router.navigateByUrl('pet-create');
  }

  // Метод для перехода к списку чатов
  toSupport() {
    this.closeMenu();
    this.router.navigateByUrl('list-chats');
  }

  // Метод для перехода к списку медицинских чатов
  toVet() {
    this.closeMenu();
    this.router.navigateByUrl('list-medical-chats');
  }

  // Метод для перехода к настройкам безопасности
  toSecurity() {
    this.closeMenu();
    this.router.navigateByUrl('security');
  }

  // Метод для открытия меню
  openMenu() {
    this.menu.open("home-menu");
  }

  // Метод для закрытия меню
  closeMenu() {
    this.menu.close("home-menu");
  }

  // Метод для выхода из приложения
  logOff() {
    this.closeMenu();
    this.sessionService.clear();
    this.router.navigateByUrl('index');
  }
}
