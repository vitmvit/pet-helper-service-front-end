import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {MenuController} from "@ionic/angular";
import {RecordService} from "../../service/record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecordModel} from "../../model/entity/record.model";
import {ImageService} from "../../service/image.service";
import {ErrorModel} from "../../model/entity/error.model";
import {RecordUpdateDto} from "../../model/dto/record.update.dto";

@Component({
  selector: 'app-pet-properties',
  templateUrl: './pet-properties.page.html',
  styleUrls: ['./pet-properties.page.scss'],
})
export class PetPropertiesPage implements OnInit {

  id!: number;
  record!: RecordModel;
  avatar!: File;
  imageUuid: string = "";
  recordId!: number;
  typeSex!: string[]
  sex!: string
  name!: string
  fullName!: string
  description!: string
  errorModel!: ErrorModel | undefined
  dataBirthday!: Date
  isDeleteAlertOpen!: boolean

  displayEdit!: string
  displayData!: string

  public alertButtons = [
    {
      text: 'Отмена',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'Удалить',
      role: 'confirm',
      handler: () => {
        this.deleteRecord()
      },
    },
  ];

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
              private menu: MenuController,
              private recordService: RecordService,
              private router: Router,
              private route: ActivatedRoute) {
    sessionService.checkLogin();
    route.params.subscribe(params => this.id = params["id"]);
  }

  ngOnInit(): void {
    this.isDeleteAlertOpen = false
    this.typeSex = ["MALE", "FEMALE", "HERM", "UNKNOWN"]
    this.displayEdit = "none"
    this.displayData = "block"

    this.recordService.getRecordById(this.id).subscribe(
      {
        next: (record) => {
          this.record = record;
          this.recordId = record.id

          this.sex = record.sex
          this.name = record.name
          this.imageUuid = record.uuidAvatar
          this.fullName = record.fullName
          this.description = record.description
          this.dataBirthday = record.dataBirthday
        },
        error: () => {
        }
      }
    )
  }

  toDelete() {
    this.isDeleteAlertOpen = true
  }

  toHome() {
    this.closeMenu()
    this.router.navigateByUrl('home');
  }

  fileSelect(event: any) {
    this.avatar = event.target.files[0];
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
    this.menu.open("pet-properties-menu")
  }

  closeMenu() {
    this.menu.close("pet-properties-menu")
  }

  deleteRecord() {
    this.recordService.deleteRecord(this.recordId).subscribe(
      {
        next: (dto) => {
          this.router.navigateByUrl('home');
        }
      })
  }

  updateRecord() {
    this.saveImage()
    this.recordService.updateRecord(new RecordUpdateDto(this.recordId, this.sessionService.getLogin(), this.name, this.imageUuid, this.dataBirthday, this.fullName, this.sex, this.description, false)).subscribe(
      {
        next: (dto) => {
        }
      })
    this.toEditRecord()
  }

  saveImage() {
    if (this.avatar != undefined) {
      this.imageService.saveAvatar(this.avatar).subscribe({
        next: (dto) => {
          this.imageUuid = dto.generatedName;
          this.recordService.updateAvatarUuid(this.recordId, this.imageUuid).subscribe({
            next: (model) => {
            }
          })
        },
        error: () => {
        }
      })
    }
  }

  toEditRecord() {
    if (this.displayEdit == "none") {
      this.displayEdit = "block"
      this.displayData = "none"
    } else {
      this.displayEdit = "none"
      this.displayData = "block"
    }
  }

  logOff() {
    this.closeMenu()
    this.sessionService.clear();
    this.router.navigateByUrl('index');
  }
}
