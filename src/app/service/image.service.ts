import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {ImageDto} from "../model/dto/image.dto";

@Injectable({providedIn: "root"})
export class ImageService {

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private sessionService: SessionService) {
  }

  getAvatar(uuid: string): Observable<string> {
    return this.httpClient.get<string>(
      "http://localhost:8086/api/v1/avatars/base64?uuid=" + uuid,
      {responseType: 'text' as 'json'}
      //this.sessionService.getHeaderToken()
    );
  }

  saveAvatar(file: File): Observable<ImageDto> {
    const formData: FormData = new FormData();
    formData.append("image", file);
    return this.httpClient.post<ImageDto>(
      "http://localhost:8086/api/v1/avatars/save/img",
      formData //,
      //this.sessionService.getHeaderToken()
    );
  }
}
