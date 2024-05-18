import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {IonModal} from "@ionic/angular";
import {RecordService} from "../../service/record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecordModel} from "../../model/entity/record.model";
import {ImageService} from "../../service/image.service";
import {ErrorModel} from "../../model/entity/error.model";
import {RecordUpdateDto} from "../../model/update/record.update.dto";
import {PedigreeService} from "../../service/pedigree.service";
import {PedigreeCreateDto} from "../../model/create/pedigree.create";
import {StateService} from "../../service/state.service";
import {StateDictionaryModel} from "../../model/entity/state.dictionary.model";
import {AnimalTypeModel} from "../../model/entity/animal.type.model";
import {AnimalTypeService} from "../../service/animal.type.service";
import {EventDictionaryModel} from "../../model/entity/event.dictionary.model";
import {EventService} from "../../service/event.service";
import {EventModel} from "../../model/entity/event.model";
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import {BreedModel} from "../../model/entity/breed.model";
import {BreedService} from "../../service/breed.service";
import {ActuatorService} from "../../service/actuator.service";

@Component({
  selector: 'app-pet-properties',
  templateUrl: './pet-properties.page.html',
  styleUrls: ['./pet-properties.page.scss'],
})
export class PetPropertiesPage implements OnInit {

  id!: number;
  record!: RecordModel;
  avatar!: File;
  imageUuid: string = "";
  recordId!: number;
  listStateDictionary!: StateDictionaryModel[];
  listEventDictionary!: EventDictionaryModel[];
  listAnimalTypes!: AnimalTypeModel[];
  typeSex!: string[][]
  sex!: string
  name!: string
  breed!: string
  animalType!: string
  fullName!: string
  description!: string
  errorModel!: ErrorModel | undefined
  dataBirthday!: Date
  isDeleteAlertOpen!: boolean
  labels: { date: string, color: string, text: string }[] = [];
  eventList: EventModel[] = []
  selectedEventList: EventModel[] = []
  check!: boolean
  listBreeds!: BreedModel[];
  input!: string;
  selectBreed!: BreedModel;

  displayEdit!: string
  displayData!: string

  isModalOpenChoiceTypeAnimal = false;
  isModalOpenShowTable = false;
  @ViewChild(IonModal) modal!: IonModal;
  public alertButtons = [
    {
      text: 'Отмена',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'Удалить',
      role: 'confirm',
      handler: () => {
        this.deleteRecord()
      },
    },
  ];

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
              private pedigreeService: PedigreeService,
              private animalTypeService: AnimalTypeService,
              private stateDictionaryService: StateService,
              private eventDictionaryService: EventService,
              private breedService: BreedService,
              private recordService: RecordService,
              private actuatorService: ActuatorService,
              private router: Router,
              private route: ActivatedRoute) {
    this.actuatorService.getHealthService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })

    sessionService.checkLogin();
    route.params.subscribe(params => {
      this.id = params["id"];
      this.getRecord();
      this.getStateDictionaries();
      this.getEventDictionaries();
    });
  }

  ngOnInit(): void {
    this.errorModel = undefined
    this.isDeleteAlertOpen = false
    this.typeSex = [["MALE", "Мужской"], ["FEMALE", "Женский"], ["HERM", "Гермо"], ["UNKNOWN", "Неизвестен"]]
    this.displayEdit = "none"
    this.displayData = "block"

    this.getStateDictionaries();
    this.getEventDictionaries();
  }

  toPdf() {
    const dashboard = document.getElementById('pdfTable');

    if (dashboard) {
      const dashboardHeight = dashboard.clientHeight;
      const dashboardWidth = dashboard.clientWidth;
      const options = {background: 'white', width: dashboardWidth, height: dashboardHeight};
      domtoimage.toPng(dashboard, options).then((imgData) => {
        const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save(this.record.name + '_общий_календарь_pdf.pdf');
      });
    }
  }

  getDataForTypeAnfBreed() {
    if (!this.selectBreed) {
      if (this.input) {
        // Если есть введенное значение поиска, фильтруем записи по названию
        this.listAnimalTypes = this.listAnimalTypes.filter(record => record.name.includes(this.input));
      } else {
        this.animalTypeService.getAnimalTypes().subscribe({
          next: (list) => {
            this.listAnimalTypes = list
            console.log(list)
          }
        })
      }
    } else {
      if (this.input) {
        // Если есть введенное значение поиска, фильтруем записи по названию
        this.listBreeds = this.listBreeds.filter(record => record.name.includes(this.input));
      } else {
        if (this.selectBreed) {
          this.breedService.getBreedByAnimalTypeId(this.selectBreed.id).subscribe({
            next: (list) => {
              this.listBreeds = list
              console.log(list)
            }
          })
        }
      }

    }
  }

  getData() {
    this.eventList = []
    this.labels = []
    if (this.recordId) {
      this.eventDictionaryService.getDictionaries(this.recordId).subscribe({
        next: (list) => {
          for (let i = 0; i < list.length; i++) {
            this.eventDictionaryService.getEventsByDictionaryId(list[i].id).subscribe({
              next: (listModel) => {
                if (listModel.length > 0) {
                  for (let j = 0; j < listModel.length; j++) {
                    this.eventList.push(listModel[j])
                    const label = {
                      date: listModel[j].dateCreated,
                      color: listModel[j].textColor || '',
                      text: listModel[j].description
                    };
                    this.labels.push(label);
                  }
                }
              }
            })
          }
        }
      })
    }
  }

  getDictionaryName(id: number): string {
    let dictName = ""
    if (id != null) {
      this.eventDictionaryService.getDictionaryById(id).subscribe({
        next: (model) => {
          dictName = model.name.toString()
        }
      })
    }
    return dictName
  }

  dateClick($event: any) {
    this.selectedEventList = []

    let year = new Date($event.value).getFullYear()
    let month = new Date($event.value).getMonth()
    let day = new Date($event.value).getDate()

    if (this.selectedEventList && this.eventList) {
      for (let i = 0; i < this.labels.length; i++) {
        let yearEvent = new Date(this.eventList[i].dateCreated).getFullYear()
        let monthEvent = new Date(this.eventList[i].dateCreated).getMonth()
        let dayEvent = new Date(this.eventList[i].dateCreated).getDate()
        if (year == yearEvent && month == monthEvent && day == dayEvent) {
          this.selectedEventList.push(this.eventList[i])
        }
      }
    }
  }

  getRecord() {
    this.recordService.getRecordById(this.id).subscribe(
      {
        next: (record) => {
          this.record = record;
          this.recordId = record.id

          this.animalType = record.animalType
          this.sex = record.sex
          this.name = record.name
          this.breed = record.breed
          this.imageUuid = record.uuidAvatar
          this.fullName = record.fullName
          this.description = record.description
          this.dataBirthday = record.dataBirthday

          this.getData()
        },
        error: () => {
        }
      }
    )
  }

  fileSelect(event: any) {
    this.avatar = event.target.files[0];
  }

  deleteRecord() {
    this.recordService.deleteRecord(this.recordId).subscribe(
      {
        next: (dto) => {
          this.router.navigateByUrl('home');
        }
      })
  }

  updateRecord() {
    this.saveImage()
    this.recordService.updateRecord(new RecordUpdateDto(this.recordId, this.sessionService.getLogin(), this.name, this.breed, this.animalType, this.imageUuid, this.dataBirthday, this.fullName, this.sex, this.description, false)).subscribe(
      {
        next: (dto) => {
          console.log()
        }
      })
    this.toEditRecord()
  }

  toCreatePedigree() {
    this.pedigreeService.createPedigree(new PedigreeCreateDto(this.recordId, null, null, null, null)).subscribe({
      next: (model) => {
        this.router.navigate(['pedigree', this.recordId]);
      }
    })
  }

  toPedigree() {
    this.router.navigate(['pedigree', this.recordId]);
  }

  saveImage() {
    if (this.avatar != undefined) {
      this.imageService.saveAvatar(this.avatar).subscribe({
        next: (dto) => {
          this.imageUuid = dto.generatedName;
          this.recordService.updateAvatarUuid(this.recordId, this.imageUuid).subscribe({
            next: (model) => {
              console.log()
            }
          })
        },
        error: (fault) => {
          this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status);
        }
      })
    }
  }

  toEditRecord() {
    if (this.displayEdit == "none") {
      this.animalTypeService.getAnimalTypes().subscribe({
        next: (list) => {
          this.listAnimalTypes = list
        }
      })
      this.displayEdit = "block"
      this.displayData = "none"
    } else {
      this.displayEdit = "none"
      this.displayData = "block"
    }
  }

  getStateDictionaries() {
    this.stateDictionaryService.getDictionaries(this.id).subscribe(
      {
        next: (list) => {
          this.listStateDictionary = list.sort((a, b) => {
            // Если a.isActive === true, a должен быть перед b
            if (a.active === true && b.active === false) {
              return -1;
            }
            // Если b.isActive === true, b должен быть перед a
            else {
              return 1;
            }
          });
        }
      }
    )
  }

  getEventDictionaries() {
    this.eventDictionaryService.getDictionaries(this.id).subscribe(
      {
        next: (list) => {
          this.listEventDictionary = list.sort((a, b) => {
            // Если a.isActive === true, a должен быть перед b
            if (a.active === true && b.active === false) {
              return -1;
            }
            // Если b.isActive === true, b должен быть перед a
            else {
              return 1;
            }
          });
        }
      }
    )
  }

  // Метод для открытия/закрытия модального окна
  setOpenChoiceTypeAnimal(isOpen: boolean, isType: boolean) {
    this.isModalOpenChoiceTypeAnimal = isOpen;
    this.check = isType
  }

  // Метод для открытия/закрытия модального окна
  setOpenShowTable(isOpen: boolean) {
    this.isModalOpenShowTable = isOpen;
    this.toPdf()
  }

  cancelChoiceTypeAnimal() {
    this.isModalOpenChoiceTypeAnimal = false;
    this.modal.dismiss(null, 'cancel');
  }

  cancelShowTable() {
    this.isModalOpenShowTable = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirmChoiceTypeAnimal(item: any) {
    if (this.check) {
      this.breed = ""
      this.animalType = item.name
      this.breedService.getBreedByAnimalTypeId(item.id).subscribe({
        next: (list) => {
          this.listBreeds = list
          console.log(list)
        }
      })
    } else {
      this.selectBreed = item
      this.breed = item.name
    }
    // this.animalType = item.name
    this.isModalOpenChoiceTypeAnimal = false;
    this.modal.dismiss(null, 'confirm');
  }

  // Метод для подтверждения выбора родителя в модальном окне
  confirmShowTable(item: any) {
    this.toPdf()
    this.isModalOpenShowTable = false;
    this.modal.dismiss(null, 'confirm');
  }

  toCreateStateDictionary() {
    this.router.navigate(['state-dictionary-create', this.recordId]);
  }

  toCreateEventDictionary() {
    this.router.navigate(['event-dictionary-create', this.recordId]);
  }

  toHome() {
    this.router.navigateByUrl('home');
  }
}
