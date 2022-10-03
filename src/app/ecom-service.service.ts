import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EcomServiceService {

  private apiURL = "http://localhost:3000/emp";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  http: any;

  constructor(private httpClient: HttpClient) { }
  
  public getString (object: any) {
    let paramsAndValues = [];
    for(let key in object) {
      let value = encodeURIComponent(object[key].toString());
      paramsAndValues.push([key, value].join('='));
    }
    return paramsAndValues.join('&');
  }
  get(url:any)
  {
    return this.httpClient.get(url)
  }

 
  getData(){
    return this.httpClient.get(this.apiURL)
  }
  public post(url: string, data?: any, options?: any) {
    // data = this.postString(data);
    return this.httpClient.post(url, data, options);
  }  
  public toFormData( formValue: any ) {

    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {

      const value = formValue[key];

      formData.append(key, value);

    }

    return formData;

  }

}
