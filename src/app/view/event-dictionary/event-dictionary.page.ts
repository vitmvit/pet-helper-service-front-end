import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageModel} from "../../model/entity/image.model";
import {IonModal} from "@ionic/angular";
import {SessionService} from "../../service/session.service";
import {ImageService} from "../../service/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {EventDictionaryModel} from "../../model/entity/event.dictionary.model";
import {EventModel} from "../../model/entity/event.model";
import {EventService} from "../../service/event.service";
import {EventCreateDto} from "../../model/create/event.create.dto";
import {EventDictionaryUpdateDto} from "../../model/update/event.dictionary.update.dto";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import {ActuatorService} from "../../service/actuator.service";

@Component({
  selector: 'app-event-dictionary',
  templateUrl: './event-dictionary.page.html',
  styleUrls: ['./event-dictionary.page.scss'],
})
export class EventDictionaryPage implements OnInit {

  listImages!: ImageModel[];
  dictionary!: EventDictionaryModel
  dictionaryId!: number;
  imageUuid!: string;
  newImage!: string;
  imageBase64!: string;
  eventList!: EventModel[]
  selectedEventList: EventModel[] = []
  newEvents: EventCreateDto[] = []
  value!: string;
  dateForCheck = new Date().toISOString();
  dateBegin = new Date().toISOString();
  dateEnd = new Date().toISOString();
  description!: string;
  descriptionState!: string;
  name!: string;
  display = "none";
  isActive = true;
  offset!: string;
  typeOffset: string[] = ["DAY", "MONTH", "YEAR"]
  offsetFrequency!: number

  displayEdit!: string
  displayData!: string

  isModalOpenShowTable = false;
  isModalOpenAddCover = false;
  isModalOpenAddPoint = false;

  labels: { date: string, color: string, text: string }[] = [];
  color = "#ff006a";
  isMultiEvent = false
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
              private stateDictionaryService: EventService,
              private actuatorService: ActuatorService,
              private loc: Location,
              private router: Router,
              private route: ActivatedRoute) {
    this.actuatorService.getHealthService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })

    sessionService.checkLogin();
    route.params.subscribe(params => {
      this.dictionaryId = params["id"];
      this.imageUuid = params["uuid"];
    });
  }

  ngOnInit() {
    this.displayEdit = "none"
    this.displayData = "block"
    this.display = "none"

    this.getDictionary()
    this.getBase64(this.imageUuid)
    this.getData()
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
        doc.save(this.dictionary.name + '_календарь_pdf.pdf');
      });
    }
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
    this.stateDictionaryService.deleteEvent(id).subscribe({
      next: () => {
        this.reloadPage()
      }
    })
  }

  getData() {
    this.stateDictionaryService.getEventsByDictionaryId(this.dictionaryId).subscribe({
      next: (list) => {
        if (list.length > 0) {
          this.eventList = list

          if (this.eventList) {
            for (let i = 0; i < this.eventList.length; i++) {
              const label = {
                date: this.eventList[i].dateCreated,
                color: this.eventList[i].textColor || '',
                text: this.eventList[i].description
              };
              this.labels.push(label);
            }
          }

          this.display = "block"
        }
      }
    })
  }

  multiEvent() {
    this.isMultiEvent = !this.isMultiEvent;
  }

  generateEventDates() {
    let currentDate: Date = new Date(this.dateBegin);
    while (new Date(currentDate).getTime() <= new Date(this.dateEnd).getTime()) {
      this.newEvents.push(new EventCreateDto(this.dictionaryId, this.color, this.descriptionState, currentDate.toISOString()))
      switch (this.offset) {
        case "DAY":
          currentDate.setDate(+currentDate.getDate() + +this.offsetFrequency);
          break;
        case "MONTH":
          currentDate.setMonth(+currentDate.getMonth() + +this.offsetFrequency);
          break;
        case "YEAR":
          currentDate.setFullYear(+currentDate.getFullYear() + +this.offsetFrequency);
          break;
      }
    }
    for (let i = 0; i < this.newEvents.length; i++) {
      this.stateDictionaryService.createEvent(this.newEvents[i]).subscribe()
    }
  }

  updateDictionary() {
    if (this.newImage) {
      this.imageUuid = this.newImage
    }
    this.stateDictionaryService.updateDictionary(new EventDictionaryUpdateDto(this.dictionaryId, this.dictionary.recordId, this.name, true, this.newImage, this.descriptionState)).subscribe({
      next: () => {
        this.getDictionary()
        this.toEditRecord()
      }
    })
  }

  updateStatus() {
    this.stateDictionaryService.updateDictionary(new EventDictionaryUpdateDto(this.dictionaryId, this.dictionary.recordId, this.name, false, this.dictionary.uuid, this.descriptionState)).subscribe({
      next: () => {
        this.isActive = false
      }
    })
  }

  dateClick($event: any) {
    this.selectedEventList = []

    let year = new Date($event.value).getFullYear()
    let month = new Date($event.value).getMonth()
    let day = new Date($event.value).getDate()

    if (this.selectedEventList && this.eventList) {
      for (let i = 0; i < this.eventList.length; i++) {
        let yearEvent = new Date(this.eventList[i].dateCreated).getFullYear()
        let monthEvent = new Date(this.eventList[i].dateCreated).getMonth()
        let dayEvent = new Date(this.eventList[i].dateCreated).getDate()
        if (year == yearEvent && month == monthEvent && day == dayEvent) {
          this.selectedEventList.push(this.eventList[i])
        }
      }
    }
  }

  setOpenAddPoint(isOpen: boolean) {
    this.isModalOpenAddPoint = isOpen;
  }

  setOpenAddCover(isOpen: boolean) {
    this.imageService.getStateImages().subscribe({
      next: (list) => {
        this.listImages = list
      }
    })
    this.isModalOpenAddCover = isOpen;
  }

  setOpenShowTable(isOpen: boolean) {
    this.isModalOpenShowTable = isOpen;
    this.toPdf()
  }

  cancelAddPoint() {
    this.isModalOpenAddPoint = false;
    this.modal.dismiss(null, 'cancel');
  }

  cancelAddCover() {
    this.isModalOpenAddCover = false;
    this.modal.dismiss(null, 'cancel');
  }

  cancelShowTable() {
    this.isModalOpenShowTable = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirmAddPoint(record: any) {
    if (this.isMultiEvent) {
      this.generateEventDates()
    } else {
      this.stateDictionaryService.createEvent(new EventCreateDto(this.dictionaryId, this.color, this.descriptionState, this.dateForCheck)).subscribe()
    }
    this.getData()

    this.isModalOpenAddPoint = false;
    this.modal.dismiss(null, 'confirm');

    this.value = ""
    this.descriptionState = ""
    this.dateForCheck = new Date().toISOString()

    this.reloadPage()
  }

  confirmAddCover(record: any) {
    this.newImage = record.generatedName;
    this.isModalOpenAddCover = false;
    this.modal.dismiss(null, 'confirm');
  }

  // Метод для подтверждения выбора родителя в модальном окне
  confirmShowTable(item: any) {
    this.toPdf()
    this.isModalOpenShowTable = false;
    this.modal.dismiss(null, 'confirm');
  }

  toBack() {
    this.loc.back();
  }

  reloadPage(): void {
    window.location.reload();
  }
}

