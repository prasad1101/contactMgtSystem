import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DalService {

  constructor(private customHttp: CustomHttpService) { }

  url = environment.url;
  getContactList(): Observable<any> {
    return this.customHttp.get(this.url);
  }

  addContact(payload): Observable<any> {
    return this.customHttp.post(this.url, payload);
  }

  updateContact(payload): Observable<any> {
    return this.customHttp.put(this.url, payload)
  }



}
