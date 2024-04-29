import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {ImageService} from "../../../service/image.service";
import {RecordModel} from "../../../model/entity/record.model";

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss'],
})
export class ListComponentComponent implements OnInit {

  recordVal!: RecordModel;
  base64!: string;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private sessionService: SessionService,
              private imageService: ImageService) {
  }

  get record(): RecordModel {
    return this.recordVal;
  }

  @Input()
  set record(value: RecordModel) {
    this.recordVal = value;
    this.getBase64(this.recordVal.uuidAvatar)
  }

  ngOnInit() {
  }

  onClick() {
    this.itemClick.emit(this.record);
  }

  // Получение строки base64 для изображения по UUID
  getBase64(uuid: string) {
    this.imageService.getAvatar(uuid).subscribe(
      {
        next: (response) => {
          this.base64 = response
        },
        error: () => {
        }
      }
    )
  }
}
