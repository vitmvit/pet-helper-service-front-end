import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {ImageService} from "../../service/image.service";
import {MenuController} from "@ionic/angular";
import {RecordService} from "../../service/record.service";
import {Router} from "@angular/router";
import {RecordModel} from "../../model/entity/record.model";
import {RecordCreateDto} from "../../model/create/record.create.dto";
import {ErrorModel} from "../../model/entity/error.model";

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.page.html',
  styleUrls: ['./pet-create.page.scss'],
})
export class PetCreatePage implements OnInit {

  record!: RecordModel;
  avatar!: File | undefined;
  imageUuid: string = "";
  recordId!: number;
  typeSex!: string[]
  sex!: string
  name!: string
  fullName!: string
  description!: string
  errorModel!: ErrorModel | undefined
  dataBirthday!: string

  constructor(private sessionService: SessionService,
              private menu: MenuController,
              private imageService: ImageService,
              private recordService: RecordService,
              private router: Router) {
    sessionService.checkLogin();
  }

  ngOnInit() {
    this.dataBirthday = "";
    this.typeSex = ["MALE", "FEMALE", "HERM", "UNKNOWN"]
    this.errorModel = undefined
  }

  fileSelect(event: any) {
    this.avatar = event.target.files[0];
  }

  // Метод сохранения записи
  saveRecord() {
    this.errorModel = undefined
    if (this.name != undefined) {
      this.recordService.createRecord(new RecordCreateDto(this.sessionService.getLogin(), this.name, "", this.dataBirthday, this.fullName, this.sex, this.description)).subscribe(
        {
          next: (dto) => {
            this.recordId = dto.id
          }
        })

      if (this.avatar != undefined) {
        this.imageService.saveAvatar(this.avatar).subscribe({
          next: (dto) => {
            this.imageUuid = dto.generatedName;
            this.recordService.updateAvatarUuid(this.recordId, this.imageUuid).subscribe({
              next: (model) => {
                console.log("")
              }
            })
          },
          error: () => {
          }
        })
      }
      this.router.navigate(['home', "reload"]);
    } else {
      this.errorModel = new ErrorModel("Необходимо заполнить все обязательные поля!", 404);
    }
  }
}
