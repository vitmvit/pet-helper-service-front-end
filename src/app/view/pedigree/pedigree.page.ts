import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {ImageService} from "../../service/image.service";
import {MenuController} from "@ionic/angular";
import {PedigreeService} from "../../service/pedigree.service";
import {RecordService} from "../../service/record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecordModel} from "../../model/entity/record.model";
import {PedigreeModel} from "../../model/entity/pedigree.model";
import {Location} from '@angular/common';
import {NotExistParentService} from "../../service/not.exist.parent.service";
import {NotExistParentModel} from "../../model/entity/not.exist.parent.model";
import {PedigreeUpdateDto} from "../../model/update/pedigree.update";

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.page.html',
  styleUrls: ['./pedigree.page.scss'],
})
export class PedigreePage implements OnInit {

  recordId!: number;
  parentId!: number;
  pedigreeId!: number;
  ownerId!: number;
  record!: RecordModel;
  currentPedigree!: PedigreeModel;
  parent1!: RecordModel[]; // Массив для хранения родителей существующих в системе
  parent2!: NotExistParentModel[]; // Массив для хранения несуществующих в системе родителей
  count = 0 // Счетчик для отслеживания количества загруженных родителей (может быть не больше 2)

  constructor(private sessionService: SessionService,
              private imageService: ImageService,
              private loc: Location,
              private pedigreeService: PedigreeService,
              private notExistParentService: NotExistParentService,
              private menu: MenuController,
              private recordService: RecordService,
              private router: Router,
              private route: ActivatedRoute) {
    sessionService.checkLogin(); // Проверка авторизации пользователя
    route.params.subscribe(params => {
      this.recordId = params["id"];
      this.getPedigreeByRecordId()
    });
  }

  ngOnInit() {
    this.parent1 = [];
    this.parent2 = [];
    this.getRecord()
  }

  // Получение записи, соответствующей текущему `recordId`
  getRecord() {
    this.recordService.getRecordById(this.recordId).subscribe(
      {
        next: (record) => {
          this.record = record;
          this.parentId = record.id
        },
        error: () => {
        }
      }
    )
  }

  getPedigreeByRecordId() {
    // Очистка массивов `parent1` и `parent2` и сброс счетчика `count`
    this.parent1 = [];
    this.parent2 = [];
    this.count = 0
    // Получение родословной по `recordId`
    this.pedigreeService.getPedigreeByRecordId(this.recordId).subscribe(
      {
        next: (model) => {
          this.pedigreeId = model.id
          this.currentPedigree = model
          if (model.parentExistOneId != null) {
            // Получение записи первого родителя и добавление ее в `parent1`
            this.recordService.getRecordById(model.parentExistOneId).subscribe(
              {
                next: (model2) => {
                  this.parent1.push(model2);
                  this.count++
                }
              }
            )
          }
          // Если существует второй родитель
          if (model.parentExistTwoId != null) {
            // Получение записи второго родителя и добавление ее в `parent1`
            this.recordService.getRecordById(model.parentExistTwoId).subscribe(
              {
                next: (model2) => {
                  this.parent1.push(model2);
                  this.count++
                }
              }
            )
          }
          // Если есть первый несуществующий в системе родитель
          if (model.parentNotExistOneId != null) {
            // Получение информации о первом несуществующем родителе и добавление ее в `parent2`
            this.notExistParentService.getParent(model.parentNotExistOneId).subscribe(
              {
                next: (model2) => {
                  this.parent2.push(model2);
                  this.count++
                }
              }
            )
          }
          // Если есть второй несуществующий в системе родитель
          if (model.parentNotExistTwoId != null) {
            // Получение информации о втором несуществующем родителе и добавление ее в `parent2`
            this.notExistParentService.getParent(model.parentNotExistTwoId).subscribe(
              {
                next: (model2) => {
                  this.parent2?.push(model2);
                  this.count++
                }
              }
            )
          }
        }
      }
    )
  }

  deleteExistParent() {
    // Проверка, какой из существующих в системе родителей должен быть удален
    if (this.currentPedigree.parentExistOneId) {
      // Удаление первого существующего родителя
      this.pedigreeService.updatePedigree(new PedigreeUpdateDto(this.pedigreeId, this.recordId, null, this.currentPedigree.parentExistTwoId, this.currentPedigree.parentNotExistOneId, this.currentPedigree.parentNotExistTwoId)).subscribe(
        {
          next: (model) => {
            this.currentPedigree = model
            this.count--
            this.parent1 = []
          }
        }
      )
    } else {
      // Удаление второго существующего родителя
      this.pedigreeService.updatePedigree(new PedigreeUpdateDto(this.pedigreeId, this.recordId, this.currentPedigree.parentExistOneId, null, this.currentPedigree.parentNotExistOneId, this.currentPedigree.parentNotExistTwoId)).subscribe(
        {
          next: (model) => {
            this.currentPedigree = model
            this.count--
            this.parent1 = []
          }
        }
      )
    }
  }

  deleteNotExistParent() {
    // Проверка, какой из несуществующих родителей должен быть удален
    if (this.currentPedigree.parentNotExistOneId) {
      // Удаление первого несуществующего в системе родителя
      this.pedigreeService.updatePedigree(new PedigreeUpdateDto(this.pedigreeId, this.recordId, this.currentPedigree.parentExistOneId, this.currentPedigree.parentExistTwoId, null, this.currentPedigree.parentNotExistTwoId)).subscribe(
        {
          next: (model) => {
            this.currentPedigree = model
            this.count--
            this.parent2 = []
          }
        }
      )
    } else {
      // Удаление второго несуществующего в системе родителя
      this.pedigreeService.updatePedigree(new PedigreeUpdateDto(this.pedigreeId, this.recordId, this.currentPedigree.parentExistOneId, this.currentPedigree.parentExistTwoId, this.currentPedigree.parentNotExistOneId, null)).subscribe(
        {
          next: (model) => {
            this.currentPedigree = model
            this.count--
            this.parent2 = []
          }
        }
      )
    }
  }

  toParent(id: number) {
    this.router.navigate(['pet-properties', id]);
  }

  toCreatePedigree() {
    this.router.navigate(['pedigree-create', this.record.id]);
  }

  toBack() {
    this.loc.back();
  }
}
