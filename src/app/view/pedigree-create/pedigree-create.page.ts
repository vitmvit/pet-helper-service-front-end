import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {PedigreeService} from "../../service/pedigree.service";
import {AlertController, IonModal} from "@ionic/angular";
import {RecordService} from "../../service/record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecordModel} from "../../model/entity/record.model";
import {PedigreeModel} from "../../model/entity/pedigree.model";
import {Location} from "@angular/common";
import {NotExistParentCreateDto} from "../../model/create/not.exist.parent.create.dto";
import {NotExistParentService} from "../../service/not.exist.parent.service";
import {PedigreeUpdateDto} from "../../model/update/pedigree.update";
import {ActuatorService} from "../../service/actuator.service";

@Component({
  selector: 'app-pedigree-create',
  templateUrl: './pedigree-create.page.html',
  styleUrls: ['./pedigree-create.page.scss'],
})
export class PedigreeCreatePage implements OnInit {

  recordId!: number;
  record!: RecordModel
  listRecords!: RecordModel[];
  base64!: string;
  currentPedigree!: PedigreeModel;

  existParentRecord!: RecordModel | undefined;
  notExistParentRecord: NotExistParentCreateDto | undefined;

  isModalOpen = false;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private sessionService: SessionService,
              private location: Location,
              private alertController: AlertController,
              private actuatorService: ActuatorService,
              private pedigreeService: PedigreeService,
              private notExistParentService: NotExistParentService,
              private recordService: RecordService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    sessionService.checkLogin();
  }

  ngOnInit() {
    this.actuatorService.getHealthPetHelperService().subscribe({
      error: () => {
        this.router.navigateByUrl('page500');
      }
    })
    // Получение идентификатора записи из параметров маршрута
    this.route.params.subscribe(params => this.recordId = params["id"])
    this.getAllRecords()
  }

  // Метод для отображения алерта для ввода данных несуществующего родителя
  async alertShow() {
    const alert = await this.alertController.create({
      header: "Введите данные родителя",
      inputs: [
        {
          name: 'name',
          placeholder: 'Имя'
        },
        {
          name: 'sex',
          placeholder: 'Пол'
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Заметки'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          role: "ok",
          handler: (alertData) => {
            this.notExistParentRecord = new NotExistParentCreateDto(alertData.name, alertData.sex, alertData.description)
          }
        }
      ]
    });
    await alert.present();
  }

  // Метод для получения всех записей пользователя
  getAllRecords() {
    this.recordService.getMyRecords(this.sessionService.getLogin()).subscribe({
      next: (listRecord) => {
        console.log(listRecord)
        this.listRecords = listRecord
      },
      error: () => {
      }
    })
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

  // Метод для подтверждения выбора родителя в модальном окне
  confirm(record: any) {
    this.existParentRecord = record;

    this.isModalOpen = false;
    this.modal.dismiss(null, 'confirm');
  }

  // Метод для закрытия (удаления) существующего родителя
  closeExistParent() {
    this.existParentRecord = undefined
  }

  // Метод для закрытия (удаления) несуществующего родителя
  closeNoExistParent() {
    this.notExistParentRecord = undefined
  }

  // Метод для сохранения данных
  saveData() {
    this.recordService.getRecordById(this.recordId).subscribe(
      {
        next: (record) => {
          this.record = record;
          this.pedigreeService.getPedigreeByRecordId(this.recordId).subscribe({
              next: (model) => {
                this.currentPedigree = model
                if (this.existParentRecord) {
                  this.addExistRecordInPedigree(model, this.existParentRecord)
                }
                if (this.notExistParentRecord) {
                  this.addNoExistRecordInPedigree(model, this.notExistParentRecord)
                }
              }
            }
          )
        }
      });
  }

  // Метод для добавления существующей записи в родословную
  addExistRecordInPedigree(model: PedigreeModel, parentExistModel: RecordModel) {
    if (!this.currentPedigree.parentExistOneId) {
      this.pedigreeService.updatePedigree(new PedigreeUpdateDto(this.currentPedigree.id, this.recordId, parentExistModel.id, this.currentPedigree.parentExistTwoId, this.currentPedigree.parentNotExistOneId, this.currentPedigree.parentNotExistTwoId)).subscribe({
        next: (model) => {
          this.toBack()
        },
        error: (fault) => {
          console.log(fault.status)
        }
      })
    } else {
      this.pedigreeService.updatePedigree(new PedigreeUpdateDto(this.currentPedigree.id, this.recordId, this.currentPedigree.parentExistOneId, parentExistModel.id, this.currentPedigree.parentNotExistOneId, this.currentPedigree.parentNotExistTwoId)).subscribe({
        next: (model) => {
          this.toBack()
        },
        error: (fault) => {
          console.log(fault.status)
        }
      })
    }

  }

  // Метод для добавления несуществующей записи в родословную
  addNoExistRecordInPedigree(model: PedigreeModel, parentNotExistModel: NotExistParentCreateDto) {
    this.notExistParentService.createParent(parentNotExistModel).subscribe(
      {
        next: (dto) => {
          if (!this.currentPedigree.parentNotExistOneId) {
            this.pedigreeService.updatePedigree(new PedigreeUpdateDto(this.currentPedigree.id, this.recordId, this.currentPedigree.parentExistOneId, this.currentPedigree.parentExistTwoId, dto.id, this.currentPedigree.parentNotExistTwoId)).subscribe({
              next: (model) => {
                this.toBack()
              },
              error: (fault) => {
                console.log(fault.status)
              }
            })
          } else {
            this.pedigreeService.updatePedigree(new PedigreeUpdateDto(this.currentPedigree.id, this.recordId, this.currentPedigree.parentExistOneId, this.currentPedigree.parentExistTwoId, this.currentPedigree.parentNotExistOneId, dto.id)).subscribe({
              next: (model) => {
                this.toBack()
              },
              error: (fault) => {
                console.log(fault.status)
              }
            })
          }
        },
        error: (fault) => {
          console.log(fault.status)
        }
      }
    )
  }

  toBack() {
    this.location.back();
  }
}
