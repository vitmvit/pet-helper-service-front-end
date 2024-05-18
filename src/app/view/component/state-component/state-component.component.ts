import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "../../../service/image.service";
import {StateDictionaryModel} from "../../../model/entity/state.dictionary.model";
import {Router} from "@angular/router";
import {ErrorModel} from "../../../model/entity/error.model";

@Component({
  selector: 'app-state-component',
  templateUrl: './state-component.component.html',
  styleUrls: ['./state-component.component.scss'],
})
export class StateComponentComponent {

  recordVal!: StateDictionaryModel;
  base64!: string;
  imageUuid!: string;
  errorModel!: ErrorModel | undefined;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private imageService: ImageService,
              private router: Router,) {
  }

  get record(): StateDictionaryModel {
    return this.recordVal;
  }

  @Input()
  set record(value: StateDictionaryModel) {
    this.recordVal = value;
    this.getBase64(this.recordVal.uuid)
  }

  onClick() {
    this.itemClick.emit(this.record);
  }

  toDictionary() {
    this.router.navigate(['state-dictionary', this.recordVal.id, this.imageUuid]);
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
