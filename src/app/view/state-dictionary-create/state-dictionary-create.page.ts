import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {IonModal} from "@ionic/angular";
import {ImageService} from "../../service/image.service";
import {ImageModel} from "../../model/entity/image.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../service/session.service";
import {StateService} from "../../service/state.service";
import {StateDictionaryCreateDto} from "../../model/create/state.dictionary.create.dto";
import {StateTemplateModel} from "../../model/entity/state.template.model";
import {ActuatorService} from "../../service/actuator.service";
import {ErrorModel} from "../../model/entity/error.model";

@Component({
  selector: 'app-state-dictionary-create',
  templateUrl: './state-dictionary-create.page.html',
  styleUrls: ['./state-dictionary-create.page.scss'],
})
export class StateDictionaryCreatePage implements OnInit {

  listImages!: ImageModel[];
  listStateTemplate!: StateTemplateModel[];
  image!: File | undefined;
  imageBase64!: string | ArrayBuffer | null;
  imageUuid!: string;
  recordId!: number;
  name!: string;
  description!: string;
  errorModel!: ErrorModel | undefined;

  isModalOpen = false;
  isModalOpenChoiceTheme = false;
  @ViewChild(IonModal) modal!: IonModal;

  options: { label: string, value: any }[] = [];

  constructor(
    private loc: Location,
    private actuatorService: ActuatorService,
    private sessionService: SessionService,
    private stateDictionaryService: StateService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
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
    this.getStateTemplates()
  }

  getStateTemplates() {
    this.stateDictionaryService.getStateTemplates().subscribe(
      {
        next: (list) => {
          this.listStateTemplate = list
          for (let i = 0; i < list.length; i++) {
            this.options.push({label: list[i].name, value: list[i].id})
          }
        }
      }
    )
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

  setOpenChoiceTheme(isOpen: boolean) {
    this.isModalOpenChoiceTheme = isOpen;
  }

  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  cancelChoiceTheme() {
    this.isModalOpenChoiceTheme = false;
    this.modal.dismiss(null, 'cancel');
  }

  // Метод для подтверждения выбора родителя в модальном окне
  confirm(record: any) {
    // this.isCustomImage = false
    this.getBase64(record.generatedName);

    this.isModalOpen = false;
    this.modal.dismiss(null, 'confirm');
  }

  confirmChoiceTheme(record: any) {
    this.name = record.name
    this.imageUuid = record.imageUuid
    this.description = record.description

    this.createDictionary()

    this.isModalOpenChoiceTheme = false;
    this.modal.dismiss(null, 'confirm');
  }

  toBack() {
    this.loc.back();
  }
}
