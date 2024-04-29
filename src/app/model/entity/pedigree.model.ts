export class PedigreeModel {

  public id: number;
  public recordId: number;
  public parentExistOneId: number;
  public parentExistTwoId: number;
  public parentNotExistOneId: number;
  public parentNotExistTwoId: number;

  constructor(id: number,
              recordId: number,
              parentExistOneId: number,
              parentExistTwoId: number,
              parentNotExistOneId: number,
              parentNotExistTwoId: number,
  ) {
    this.id = id;
    this.recordId = recordId;
    this.parentExistOneId = parentExistOneId;
    this.parentExistTwoId = parentExistTwoId;
    this.parentNotExistOneId = parentNotExistOneId;
    this.parentNotExistTwoId = parentNotExistTwoId;
  }
}
