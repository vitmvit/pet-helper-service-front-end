import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ErrorModel} from "../../../model/entity/error.model";
import {ImageService} from "../../../service/image.service";
import {Router} from "@angular/router";
import {EventDictionaryModel} from "../../../model/entity/event.dictionary.model";

@Component({
  selector: 'app-event-component',
  templateUrl: './event-component.component.html',
  styleUrls: ['./event-component.component.scss'],
})
export class EventComponentComponent {

  recordVal!: EventDictionaryModel;
  base64!: string;
  imageUuid!: string;
  errorModel!: ErrorModel | undefined;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private imageService: ImageService,
              private router: Router) {
  }

  get record(): EventDictionaryModel {
    return this.recordVal;
  }

  @Input()
  set record(value: EventDictionaryModel) {
    this.recordVal = value;
    this.getBase64(this.recordVal.uuid)
  }

  onClick() {
    this.itemClick.emit(this.record);
  }

  toDictionary() {
    this.router.navigate(['event-dictionary', this.recordVal.id, this.imageUuid]);
  }

  // Получение строки base64 для изображения по UUID
  getBase64(uuid: string) {
    this.errorModel = undefined
    this.imageService.getStateImage(uuid).subscribe(
      {
        next: (response) => {
          this.base64 = response
          this.imageUuid = uuid
        },
        error: (fault2) => {
          this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault2.status);
        }
      }
    )
  }
}
