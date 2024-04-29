export class PedigreeUpdateDto {

  public id: number;
  public recordId: number;
  public parentExistOneId: number | null;
  public parentExistTwoId: number | null;
  public parentNotExistOneId: number | null;
  public parentNotExistTwoId: number | null;

  constructor(id: number,
              recordId: number,
              parentExistOneId: number | null,
              parentExistTwoId: number | null,
              parentNotExistOneId: number | null,
              parentNotExistTwoId: number | null,
  ) {
    this.id = id;
    this.recordId = recordId;
    this.parentExistOneId = parentExistOneId;
    this.parentExistTwoId = parentExistTwoId;
    this.parentNotExistOneId = parentNotExistOneId;
    this.parentNotExistTwoId = parentNotExistTwoId;
  }
}
