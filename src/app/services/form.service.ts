import { Employee } from './../models/employee.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';


@Injectable()
export class FormService {

  constructor(private http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    console.error('post error: ', error);
    return Observable.throw(error.statusText);
  }

  extractLanguages(res: Response) {
    let body = res.json();
    return body.data.languages || {};
  }

  getLanguages(): Observable<string[]> {
    return this.http.get('http://localhost:3100/getlanguages')
      .delay(2000) // simulate slow response
      // .map((response: Response) => <string[]>response.json().data.languages)
      //OR
      .map(this.extractLanguages)
      .catch(this.handleError)
  }

  postEmployeeForm(employee: Employee): Observable<Employee> {
    let body = JSON.stringify(employee);
    let headers = new Headers({ 'Content-Type': 'aplication/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3100/postemployee', body, options)
      .map(this.extractData)
      .catch(this.handleError)
  }
}
