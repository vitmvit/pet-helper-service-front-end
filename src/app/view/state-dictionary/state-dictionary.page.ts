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

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

@Component({
  selector: 'app-state-dictionary',
  templateUrl: './state-dictionary.page.html',
  styleUrls: ['./state-dictionary.page.scss'],
})
export class StateDictionaryPage implements OnInit {

  dictionary!: StateDictionaryModel
  dictionaryId!: number;
  imageUuid!: string;
  imageBase64!: string;
  stateList!: StateModel[]
  beginPeriod!: string
  endPeriod!: string
  data: any[] = []
  labels: any[] = []
  value!: number;
  dateForCheck = new Date().toISOString();
  description!: string;
  display = "none";
  lineChart!: any;
  isModalOpen = false;
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
              private stateDictionaryService: StateService,
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
    this.display = "none";
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

  // Метод для отмены выбора родителя в модальном окне
  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm(record: any) {
    if (isNumber(+this.value)) {
      this.stateDictionaryService.createState(new StateCreateDto(this.dictionaryId, this.value, this.description, this.dateForCheck)).subscribe(
        {
          next: (model) => {
            this.getData()
            this.isModalOpen = false;
            this.modal.dismiss(null, 'confirm');
          }
        }
      )
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
          console.log(model)
        }
      }
    )
  }

  getBase64(uuid: string) {
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

  deleteDictionary() {
    this.stateDictionaryService.deleteDictionary(this.dictionaryId).subscribe(
      {
        next: () => {
          this.toBack()
        }
      }
    )
  }

  getData() {
    this.stateDictionaryService.getStatesByDictionaryId(this.dictionaryId).subscribe({
      next: (list) => {
        if (list.length > 0) {
          this.stateList = list.sort((a, b) => {
            return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
          });
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

  toBack() {
    this.loc.back();
  }
}
