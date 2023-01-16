import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from 'src/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environement.apiUrl;
  constructor(private httpClient: HttpClient) { }

  singup(data: any) {
    return this.httpClient.post(this.url + "/user/singup", data, {
      headers: new HttpHeaders().set('content-Type', "application/json")
    })
  }
}
