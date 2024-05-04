import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {AlertController, IonModal} from "@ionic/angular";
import {ImageService} from "../../service/image.service";
import {ImageModel} from "../../model/entity/image.model";
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../../service/session.service";
import {StateService} from "../../service/state.service";
import {StateDictionaryCreateDto} from "../../model/create/state.dictionary.create.dto";
import {StateTemplateModel} from "../../model/entity/state.template.model";

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
  // isCustomImage = false;

  isModalOpen = false;
  isModalOpen2 = false;
  @ViewChild(IonModal) modal!: IonModal;

  options: { label: string, value: any }[] = [];

  constructor(
    private loc: Location,
    private alertController: AlertController,
    private sessionService: SessionService,
    private stateDictionaryService: StateService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {
    sessionService.checkLogin();
    route.params.subscribe(params => {
      this.recordId = params["id"];
    });
  }

  ngOnInit() {
    this.imageService.getStateImages().subscribe({
      next: (list) => {
        this.listImages = list
      }
    })
    this.getStateTemplates()
  }

  // Метод для открытия/закрытия модального окна
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }

  getStateTemplates() {
    this.stateDictionaryService.getStateTemplates().subscribe(
      {
        next: (list) => {
          console.log(list)
          this.listStateTemplate = list
          for (let i = 0; i < list.length; i++) {
            this.options.push({label: list[i].name, value: list[i].id})
          }
        }
      }
    )
  }

  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  cancel2() {
    this.isModalOpen2 = false;
    this.modal.dismiss(null, 'cancel');
  }

  // Метод для подтверждения выбора родителя в модальном окне
  confirm(record: any) {
    // this.isCustomImage = false
    this.getBase64(record.generatedName);

    this.isModalOpen = false;
    this.modal.dismiss(null, 'confirm');
  }

  confirm2(record: any) {
    this.name = record.name
    this.imageUuid = record.imageUuid
    this.description = record.description
    this.description = record.description

    this.createDictionary()

    this.isModalOpen2 = false;
    this.modal.dismiss(null, 'confirm');
  }

  getBase64(uuid: string) {
    this.imageService.getStateImage(uuid).subscribe(
      {
        next: (response) => {
          this.imageBase64 = response
          this.imageUuid = uuid
        },
        error: () => {
        }
      }
    )
  }

  // fileSelect(event: any) {
  //   this.isCustomImage = true
  //
  //   this.image = event.target.files[0]
  //   this.handleUpload(event)
  //   this.cancel()
  // }

  // handleUpload(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imageBase64 = reader.result
  //   };
  // }

  createDictionary() {
    if (this.image) {
      // if(this.isCustomImage && this.image){
      this.imageService.saveStateImage(this.image).subscribe({
        next: (model) => {
          this.imageUuid = model.generatedName
          this.stateDictionaryService.createDictionary(new StateDictionaryCreateDto(this.recordId, this.name, this.imageUuid, this.description)).subscribe({
            next: (model) => {
              this.toBack()
            },
            error: () => {
              console.log()
            }
          })
        },
      })
    } else {
      this.stateDictionaryService.createDictionary(new StateDictionaryCreateDto(this.recordId, this.name, this.imageUuid, this.description)).subscribe({
        next: (model) => {
          this.toBack()
        },
        error: () => {
          console.log()
        }
      })
    }
  }

  toBack() {
    this.loc.back();
  }
}
