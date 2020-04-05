import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  constructor(private http: HttpClient) { }


  get(url): Observable<any> {
    return this.http.get(url);
  }

  post(url, payload): Observable<any> {
    // let headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', 'https:://jsonblob.com');
    // headers.append('Access-Control-Allow-Methods', 'POST, PUT, DELETE, HEAD, PATCH, OPTIONS');
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'https:://jsonblob.com',
      'Access-Control-Allow-Methods': 'POST, PUT, DELETE, HEAD, PATCH, OPTIONS'
    });
    let options = { headers: headers };
    //let options = new RequestOptions({ headers: headers });
    return this.http.post(url, payload, options)
  }

  put(url, payload): Observable<any> {
    return this.http.put(url, payload)
  }


}
