export class ImageModel {

  public generatedName: string;
  public originalName: string;
  public mimeType: string;
  public filePath: string;
  public description: string;

  constructor(generatedName: string,
              originalName: string,
              mimeType: string,
              filePath: string,
              description: string) {
    this.generatedName = generatedName;
    this.originalName = originalName;
    this.mimeType = mimeType;
    this.filePath = filePath;
    this.description = description;
  }
}
