import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {ImageService} from "../../../service/image.service";
import {StateDictionaryModel} from "../../../model/entity/state.dictionary.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-state-component',
  templateUrl: './state-component.component.html',
  styleUrls: ['./state-component.component.scss'],
})
export class StateComponentComponent implements OnInit {

  recordVal!: StateDictionaryModel;
  base64!: string;
  imageUuid!: string;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
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

  ngOnInit() {
  }

  onClick() {
    this.itemClick.emit(this.record);
  }

  toDictionary() {
    this.router.navigate(['state-dictionary', this.recordVal.id, this.imageUuid]);
  }

  // Получение строки base64 для изображения по UUID
  getBase64(uuid: string) {
    this.imageService.getStateImage(uuid).subscribe(
      {
        next: (response) => {
          this.base64 = response
          this.imageUuid = uuid
        },
        error: () => {
        }
      }
    )
  }
}
