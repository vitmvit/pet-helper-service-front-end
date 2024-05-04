import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {ImageService} from "../../../service/image.service";
import {StateTemplateModel} from "../../../model/entity/state.template.model";

@Component({
  selector: 'app-template-image',
  templateUrl: './template-image.component.html',
  styleUrls: ['./template-image.component.scss'],
})
export class TemplateImageComponent implements OnInit {

  recordVal!: StateTemplateModel;
  base64!: string;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private sessionService: SessionService,
              private imageService: ImageService) {
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

  ngOnInit() {
  }

  // Метод, вызываемый при клике на компонент
  onClick() {
    // Эмитируем событие itemClick с моделью шаблона
    this.itemClick.emit(this.record);
  }

  // Метод для получения base64-строки изображения по UUID
  getBase64(uuid: string) {
    this.imageService.getStateImage(uuid).subscribe(
      {
        next: (response) => {
          this.base64 = response;
        },
        error: () => {
          // Обработка ошибки
        }
      }
    );
  }
}
