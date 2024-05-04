import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {ImageModel} from "../model/entity/image.model";

@Injectable({providedIn: "root"})
export class ImageService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService) {
  }

  getAvatar(uuid: string): Observable<string> {
    return this.httpClient.get<string>(
      this.apiService.getApiHost + "/api/v1/avatars/base64?uuid=" + uuid,
      {responseType: 'text' as 'json'}
    );
  }

  getStateImage(uuid: string): Observable<string> {
    return this.httpClient.get<string>(
      this.apiService.getApiHost + "/api/v1/stateImages/base64?uuid=" + uuid,
      {responseType: 'text' as 'json'}
    );
  }

  getStateImages(): Observable<ImageModel[]> {
    return this.httpClient.get<ImageModel[]>(
      this.apiService.getApiHost + "/api/v1/stateImages",
      // {responseType: 'text' as 'json'}
    );
  }

  saveStateImage(file: File): Observable<ImageModel> {
    const formData: FormData = new FormData();
    formData.append("image", file);
    return this.httpClient.post<ImageModel>(
      this.apiService.getApiHost + "/api/v1/stateImages/save/img",
      formData
    );
  }

  saveAvatar(file: File): Observable<ImageModel> {
    const formData: FormData = new FormData();
    formData.append("image", file);
    return this.httpClient.post<ImageModel>(
      this.apiService.getApiHost + "/api/v1/avatars/save/img",
      formData
    );
  }
}
