import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";
import {RecordService} from "../../service/record.service";
import {RecordModel} from "../../model/entity/record.model";
import {ImageService} from "../../service/image.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listRecords!: RecordModel[];
  private refreshIntervalId: any;

  constructor(private sessionService: SessionService,
              private menu: MenuController,
              private imageService: ImageService,
              private recordService: RecordService,
              private router: Router) {
    sessionService.checkLogin();
  }

  ngOnInit(): void {
    // Устанавливаем интервал обновления каждую секунду
    this.refreshIntervalId = setInterval(() => {
      this.getMyRecords();
    }, 1000);
  }

  getMyRecords() {
    this.recordService.getMyRecords(this.sessionService.getLogin()).subscribe({
      next: (listRecord) => {
        this.listRecords = listRecord.sort((a, b) => {
          return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
        });
      },
      error: () => {
      }
    })
  }

  getBase64(uuid: string) {
    this.imageService.getAvatar(uuid).subscribe(
      {
        next: (response) => {
          return response
        },
        error: () => {
        }
      }
    )
  }

  toCreateRecord() {
    this.closeMenu()
    this.router.navigateByUrl('pet-create');
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
