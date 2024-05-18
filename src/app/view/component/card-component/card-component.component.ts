import {Component, Input} from '@angular/core';
import {ImageService} from "../../../service/image.service";
import {Router} from "@angular/router";
import {RecordModel} from "../../../model/entity/record.model";
import {ErrorModel} from "../../../model/entity/error.model";

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
})
export class CardComponentComponent {

  recordVal!: RecordModel;
  base64!: string;
  errorModel!: ErrorModel | undefined;

  constructor(private imageService: ImageService,
              private router: Router) {
  }

  get record(): RecordModel {
    return this.recordVal;
  }

  @Input()
  set record(value: RecordModel) {
    this.recordVal = value;
    this.getBase64(this.recordVal.uuidAvatar)
  }

  // Получение строки base64 для изображения по UUID
  getBase64(uuid: string) {
    this.errorModel = undefined
    this.imageService.getAvatar(uuid).subscribe(
      {
        next: (response) => {
          this.base64 = response
        },
        error: (fault) => {
          this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status);
        }
      }
    )
  }

  toPet(id: number) {
    this.router.navigate(['pet-properties', id]);
  }
}
