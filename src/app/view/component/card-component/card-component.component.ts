import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {ImageService} from "../../../service/image.service";
import {RecordService} from "../../../service/record.service";
import {Router} from "@angular/router";
import {RecordModel} from "../../../model/entity/record.model";

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
})
export class CardComponentComponent implements OnInit {

  recordVal!: RecordModel;
  base64!: string;

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
              private recordService: RecordService,
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

  ngOnInit() {
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

  toPet(id: number) {
    this.router.navigate(['pet-properties', id]);
  }
}
