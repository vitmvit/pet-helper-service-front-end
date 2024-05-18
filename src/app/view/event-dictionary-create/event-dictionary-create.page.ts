import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageModel} from "../../model/entity/image.model";
import {ErrorModel} from "../../model/entity/error.model";
import {IonModal} from "@ionic/angular";
import {Location} from "@angular/common";
import {ActuatorService} from "../../service/actuator.service";
import {SessionService} from "../../service/session.service";
import {ImageService} from "../../service/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StateDictionaryCreateDto} from "../../model/create/state.dictionary.create.dto";
import {EventService} from "../../service/event.service";

@Component({
  selector: 'app-event-dictionary-create',
  templateUrl: './event-dictionary-create.page.html',
  styleUrls: ['./event-dictionary-create.page.scss'],
})
export class EventDictionaryCreatePage implements OnInit {

  listImages!: ImageModel[];
  image!: File | undefined;
  imageBase64!: string | ArrayBuffer | null;
  imageUuid!: string;
  recordId!: number;
  name!: string;
  description!: string;
  errorModel!: ErrorModel | undefined;

  isModalOpen = false;
  @ViewChild(IonModal) modal!: IonModal;

  options: { label: string, value: any }[] = [];

  constructor(
    private loc: Location,
    private actuatorService: ActuatorService,
    private sessionService: SessionService,
    private stateDictionaryService: EventService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.actuatorService.getHealthService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })

    sessionService.checkLogin();
    route.params.subscribe(params => {
      this.recordId = params["id"];
    });
  }

  ngOnInit() {
    this.imageService.getStateImages().subscribe({
      next: (list) => {
        this.listImages = list
      },
      error: () => {
        this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", 500);
      }
    })
  }

  getBase64(uuid: string) {
    this.imageService.getStateImage(uuid).subscribe(
      {
        next: (response) => {
          this.imageBase64 = response
          this.imageUuid = uuid
        },
        error: () => {
          this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", 500);
        }
      }
    )
  }

  createDictionary() {
    if (this.image) {
      this.imageService.saveStateImage(this.image).subscribe({
        next: (model) => {
          this.imageUuid = model.generatedName
          this.stateDictionaryService.createDictionary(new StateDictionaryCreateDto(this.recordId, this.name, this.imageUuid, this.description)).subscribe({
            next: () => {
              this.toBack()
            },
            error: () => {
              this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", 500);
            }
          })
        },
      })
    } else {
      this.stateDictionaryService.createDictionary(new StateDictionaryCreateDto(this.recordId, this.name, this.imageUuid, this.description)).subscribe({
        next: () => {
          this.toBack()
        },
        error: () => {
          this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", 500);
        }
      })
    }
  }

  // Метод для открытия/закрытия модального окна
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm(record: any) {
    this.getBase64(record.generatedName);

    this.isModalOpen = false;
    this.modal.dismiss(null, 'confirm');
  }

  toBack() {
    this.loc.back();
  }
}
