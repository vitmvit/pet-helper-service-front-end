import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from "../../../service/image.service";
import {RecordModel} from "../../../model/entity/record.model";
import {RecordService} from "../../../service/record.service";

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.scss'],
})
export class ImageComponentComponent implements OnInit {

  record!: RecordModel;
  base64: string = "";
  private imageUuidVal: string = "";
  private recordIdVal: number = 0;

  constructor(private imageService: ImageService,
              private recordService: RecordService) {
  }

  @Input()
  set imageUuid(value: string) {
    this.imageUuidVal = value;
    this.onImageUuidChange();
  }

  get recordId(): number {
    return this.recordIdVal;
  }

  @Input()
  set recordId(value: number) {
    this.recordIdVal = value;
    if (this.recordIdVal != undefined) {
      this.recordService.getRecordById(this.recordIdVal).subscribe(
        {
          next: (record) => {
            this.record = record;
            this.getAvatar(this.record.uuidAvatar)
          },
          error: () => {
          }
        });
    }
  }

  ngOnInit(): void {
  }

  // Метод для выполнения дополнительных действий при изменении imageUuid
  onImageUuidChange() {
    if (this.imageUuidVal.length > 0 && this.recordIdVal != undefined) {
      this.getAvatar(this.imageUuidVal)
    }
  }

  // Получение аватара по uuid
  getAvatar(uuid: string) {
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
