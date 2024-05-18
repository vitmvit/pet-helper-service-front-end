import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "../../../service/image.service";
import {StateTemplateModel} from "../../../model/entity/state.template.model";
import {ErrorModel} from "../../../model/entity/error.model";

@Component({
  selector: 'app-template-image',
  templateUrl: './template-image.component.html',
  styleUrls: ['./template-image.component.scss'],
})
export class TemplateImageComponent {

  recordVal!: StateTemplateModel;
  base64!: string;
  errorModel!: ErrorModel | undefined;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private imageService: ImageService) {
  }

  // Геттер для получения модели шаблона
  get record(): StateTemplateModel {
    return this.recordVal;
  }

  // Сеттер для установки модели шаблона
  @Input()
  set record(value: StateTemplateModel) {
    this.recordVal = value;
    // Получение base64-строки изображения при установке модели
    this.getBase64(this.recordVal.uuidImage);
  }

  // Метод, вызываемый при клике на компонент
  onClick() {
    // Эмитируем событие itemClick с моделью шаблона
    this.itemClick.emit(this.record);
  }

  // Метод для получения base64-строки изображения по UUID
  getBase64(uuid: string) {
    this.errorModel = undefined
    this.imageService.getStateImage(uuid).subscribe(
      {
        next: (response) => {
          this.base64 = response;
        },
        error: (fault) => {
          this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status);
        }
      }
    );
  }
}
