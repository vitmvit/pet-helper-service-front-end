import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "../../../service/image.service";
import {RecordModel} from "../../../model/entity/record.model";
import {ErrorModel} from "../../../model/entity/error.model";

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss'],
})
export class ListComponentComponent {

  recordVal!: RecordModel;
  base64!: string;
  errorModel!: ErrorModel | undefined;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private imageService: ImageService) {
  }

  get record(): RecordModel {
    return this.recordVal;
  }

  @Input()
  set record(value: RecordModel) {
    this.recordVal = value;
    this.getBase64(this.recordVal.uuidAvatar)
  }

  onClick() {
    this.itemClick.emit(this.record);
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
}
