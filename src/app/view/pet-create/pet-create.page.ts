import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {ImageService} from "../../service/image.service";
import {IonModal} from "@ionic/angular";
import {RecordService} from "../../service/record.service";
import {Router} from "@angular/router";
import {RecordModel} from "../../model/entity/record.model";
import {RecordCreateDto} from "../../model/create/record.create.dto";
import {ErrorModel} from "../../model/entity/error.model";
import {ActuatorService} from "../../service/actuator.service";
import {AnimalTypeService} from "../../service/animal.type.service";
import {AnimalTypeModel} from "../../model/entity/animal.type.model";
import {BreedModel} from "../../model/entity/breed.model";
import {BreedService} from "../../service/breed.service";

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.page.html',
  styleUrls: ['./pet-create.page.scss'],
})
export class PetCreatePage implements OnInit {

  record!: RecordModel;
  avatar!: File | undefined;
  imageUuid: string = "";
  recordId!: number;
  typeSex!: string[][];
  sex!: string;
  name!: string;
  breed!: string;
  fullName!: string;
  description!: string;
  errorModel!: ErrorModel | undefined;
  dataBirthday!: string;
  listAnimalTypes!: AnimalTypeModel[];
  listBreeds!: BreedModel[];
  animalType!: string;
  check!: boolean;
  input!: string;
  selectBreed!: BreedModel;

  isModalOpen = false;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
              private breedService: BreedService,
              private animalTypeService: AnimalTypeService,
              private actuatorService: ActuatorService,
              private recordService: RecordService,
              private router: Router) {
    this.actuatorService.getHealthService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })

    sessionService.checkLogin();
  }

  ngOnInit() {
    this.dataBirthday = "";
    this.typeSex = [["MALE", "Мужской"], ["FEMALE", "Женский"], ["HERM", "Гермо"], ["UNKNOWN", "Неизвестен"]]
    this.errorModel = undefined
    this.getData()

  }

  getData() {
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

  fileSelect(event: any) {
    this.avatar = event.target.files[0];
  }

  // Метод сохранения записи
  saveRecord() {
    this.errorModel = undefined
    if (this.name != undefined && this.animalType != undefined && this.name != "" && this.animalType != "") {
      this.recordService.createRecord(new RecordCreateDto(this.sessionService.getLogin(), this.name, this.breed, this.animalType, "", this.dataBirthday, this.fullName, this.sex, this.description)).subscribe(
        {
          next: (dto) => {
            this.recordId = dto.id
          }
        })

      if (this.avatar != undefined) {
        this.imageService.saveAvatar(this.avatar).subscribe({
          next: (dto) => {
            this.imageUuid = dto.generatedName;
            this.recordService.updateAvatarUuid(this.recordId, this.imageUuid).subscribe()
          },
          error: (fault) => {
            console.log(fault.status)
          }
        })
      }
      this.router.navigate(['home', "reload"]);
    } else {
      this.errorModel = new ErrorModel("Необходимо заполнить все обязательные поля!", 404);
    }
  }

  // Метод для открытия/закрытия модального окна
  setOpen(isOpen: boolean, isType: boolean) {
    this.isModalOpen = isOpen;
    this.check = isType
  }

  // Метод для отмены выбора родителя в модальном окне
  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  // Метод для подтверждения выбора родителя в модальном окне
  confirm(item: any) {
    if (this.check) {
      this.breed = ""
      this.animalType = item.name
      this.selectBreed = item
      this.breedService.getBreedByAnimalTypeId(item.id).subscribe({
        next: (list) => {
          this.listBreeds = list
        }
      })
    } else {
      this.breed = item.name
    }
    this.isModalOpen = false;
    this.modal.dismiss(null, 'confirm');
  }
}
