import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {ImageService} from "../../service/image.service";
import {StateService} from "../../service/state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {StateDictionaryModel} from "../../model/entity/state.dictionary.model";
import {StateModel} from "../../model/entity/state.model";
import {CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement, Title} from 'chart.js';
import {IonModal} from "@ionic/angular";
import {StateCreateDto} from "../../model/create/state.create.dto";
import {isNumber} from "chart.js/helpers";
import {ImageModel} from "../../model/entity/image.model";
import {StateDictionaryUpdateDto} from "../../model/update/state.dictionary.update.dto";
import {ActuatorService} from "../../service/actuator.service";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

@Component({
  selector: 'app-state-dictionary',
  templateUrl: './state-dictionary.page.html',
  styleUrls: ['./state-dictionary.page.scss'],
})
export class StateDictionaryPage implements OnInit {

  listImages!: ImageModel[];
  dictionary!: StateDictionaryModel
  dictionaryId!: number;
  imageUuid!: string;
  newImage!: string;
  imageBase64!: string;
  stateList!: StateModel[]
  beginPeriod!: string
  endPeriod!: string
  data: any[] = []
  labels: any[] = []
  value!: number;
  dateForCheck = new Date().toISOString();
  description!: string;
  descriptionState!: string;
  name!: string;
  display = "none";
  lineChart!: any;
  isActive = true;

  displayEdit!: string
  displayData!: string

  isModalOpen2 = false;
  isModalOpen = false;
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
              private stateDictionaryService: StateService,
              private actuatorService: ActuatorService,
              private router: Router,
              private loc: Location,
              private route: ActivatedRoute) {
    sessionService.checkLogin();
    route.params.subscribe(params => {
      this.dictionaryId = params["id"];
      this.imageUuid = params["uuid"];
    });
  }

  ngOnInit() {
    this.actuatorService.getHealthPetHelperService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })

    this.displayEdit = "none"
    this.displayData = "block"
    this.display = "none"

    this.getDictionary()
    this.getBase64(this.imageUuid)
    this.getData()
  }

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  // Метод для открытия/закрытия модального окна
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.imageService.getStateImages().subscribe({
      next: (list) => {
        this.listImages = list
      }
    })
    this.isModalOpen2 = isOpen;
  }

  // Метод для отмены выбора родителя в модальном окне
  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  cancel2() {
    this.isModalOpen2 = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm(record: any) {
    if (isNumber(+this.value)) {
      this.stateDictionaryService.createState(new StateCreateDto(this.dictionaryId, this.value, this.descriptionState, this.dateForCheck)).subscribe(
        {
          next: (model) => {
            this.getData()
            this.isModalOpen = false;
            this.modal.dismiss(null, 'confirm');

            this.value = 0
            this.descriptionState = ""
            this.dateForCheck = new Date().toISOString()

            this.reloadPage()
          }
        }
      )
    }
  }

  confirm2(record: any) {
    this.newImage = record.generatedName;
    console.log(this.newImage)
    this.isModalOpen2 = false;
    this.modal.dismiss(null, 'confirm');
  }

  toEditRecord() {
    if (this.displayEdit == "none") {
      this.display = "none"
      this.displayEdit = "block"
      this.displayData = "none"
    } else {
      this.display = "block"
      this.displayEdit = "none"
      this.displayData = "block"
    }
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "label",
            data: this.data,
            pointBorderColor: "#FFC300",
            pointBackgroundColor: "#FFC300",
            segment: {
              borderColor: "#FFC300"
            }
          }
        ]
      },
      options: {}
    });
  }

  getDictionary() {
    this.stateDictionaryService.getDictionaryById(this.dictionaryId).subscribe(
      {
        next: (model) => {
          this.dictionary = model
          this.isActive = model.active
          this.name = model.name
          this.description = model.description
          this.getBase64(model.uuid)
        }
      }
    )
  }

  getBase64(uuid: string) {
    if (uuid) {
      this.imageService.getStateImage(uuid).subscribe(
        {
          next: (response) => {
            this.imageUuid = uuid
            this.imageBase64 = response
          },
          error: () => {
          }
        }
      )
    }
  }

  deleteDictionary() {
    this.stateDictionaryService.deleteDictionary(this.dictionaryId).subscribe(
      {
        next: () => {
          this.toBack()
        }
      }
    )
  }

  deleteState(id: number) {
    this.stateDictionaryService.deleteState(id).subscribe({
      next: () => {
        this.reloadPage()
      }
    })
  }

  getData() {
    this.stateDictionaryService.getStatesByDictionaryId(this.dictionaryId).subscribe({
      next: (list) => {
        if (list.length > 0) {
          this.stateList = list.sort((a, b) => {
            return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
          });

          console.log(this.stateList)
          this.beginPeriod = this.stateList[0].dateCreated
          this.endPeriod = this.stateList[this.stateList.length - 1].dateCreated

          if (this.labels && this.data) {
            for (let i = 0; i < this.stateList.length; i++) {
              this.data.push(this.stateList[i].value)
              this.labels.push(new Date(this.stateList[i].dateCreated).toLocaleDateString())
            }
          }
          this.display = "block"
        }
      }
    })
  }

  updateDictionary() {
    if (this.newImage) {
      this.imageUuid = this.newImage
    }
    this.stateDictionaryService.updateDictionary(new StateDictionaryUpdateDto(this.dictionaryId, this.dictionary.recordId, this.name, true, this.newImage, this.descriptionState)).subscribe({
      next: (model) => {
        this.getDictionary()
        this.toEditRecord()
      }
    })
  }

  updateStatus() {
    this.stateDictionaryService.updateDictionary(new StateDictionaryUpdateDto(this.dictionaryId, this.dictionary.recordId, this.name, false, this.dictionary.uuid, this.descriptionState)).subscribe({
      next: (model) => {
        this.isActive = false
      }
    })
  }

  reloadPage(): void {
    window.location.reload();
  }

  toBack() {
    this.loc.back();
  }
}
