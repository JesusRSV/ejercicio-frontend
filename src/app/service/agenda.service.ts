import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Respuestas } from '../interface/respuestas';
import { catchError, retry, finalize, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { URL_BASE, URL_AGENDA } from '../constantes/constantes';
import { users } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(protected http: HttpClient) { }

  get_all(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    let url = `${URL_BASE}${URL_AGENDA}`;
    return this.http.get<Respuestas>(url, {headers}).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  get_one(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    let url = `${URL_BASE}${URL_AGENDA}/${id}`;
    return this.http.get<Respuestas>(url, {headers}).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }
  create(user){
    const body = JSON.stringify( user );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    let url = `${URL_BASE}${URL_AGENDA}`;
    return this.http.post<Respuestas>(url, body, {headers}).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  update(user){
    const body = JSON.stringify( user );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    let url = `${URL_BASE}${URL_AGENDA}/${user.id}`;
    return this.http.put<Respuestas>(url, body, {headers}).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }
  delete(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    let url = `${URL_BASE}${URL_AGENDA}/${id}`;
    return this.http.delete<Respuestas>(url, {headers}).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("Ha ocurrido un error:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Algo malo sucedió; intente nuevamente más tarde.");
  }
}
