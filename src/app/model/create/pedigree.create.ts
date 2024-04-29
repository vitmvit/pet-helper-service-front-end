export class PedigreeCreateDto {

  public recordId: number | null;
  public parentExistOneId: number | null;
  public parentExistTwoId: number | null;
  public parentNotExistOneId: number | null;
  public parentNotExistTwoId: number | null;

  constructor(
    recordId: number | null,
    parentExistOneId: number | null,
    parentExistTwoId: number | null,
    parentNotExistOneId: number | null,
    parentNotExistTwoId: number | null
  ) {
    this.recordId = recordId;
    this.parentExistOneId = parentExistOneId;
    this.parentExistTwoId = parentExistTwoId;
    this.parentNotExistOneId = parentNotExistOneId;
    this.parentNotExistTwoId = parentNotExistTwoId;
  }
}
