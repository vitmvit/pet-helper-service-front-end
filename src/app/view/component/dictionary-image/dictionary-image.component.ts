import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {ImageService} from "../../../service/image.service";
import {ImageModel} from "../../../model/entity/image.model";

@Component({
  selector: 'app-dictionary-image',
  templateUrl: './dictionary-image.component.html',
  styleUrls: ['./dictionary-image.component.scss'],
})
export class DictionaryImageComponent implements OnInit {

  recordVal!: ImageModel;
  base64!: string;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private sessionService: SessionService,
              private imageService: ImageService) {
  }

  // Геттер для получения модели изображения
  get record(): ImageModel {
    return this.recordVal;
  }

  // Сеттер для установки модели изображения
  @Input()
  set record(value: ImageModel) {
    this.recordVal = value;
    // Получение base64-строки изображения при установке модели
    this.getBase64(this.recordVal.generatedName);
  }

  ngOnInit() {
  }

  // Метод, вызываемый при клике на компонент
  onClick() {
    // Эмитируем событие itemClick с моделью изображения
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
