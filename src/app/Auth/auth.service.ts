import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  IsLoggedIn() {
    return !!localStorage.getItem('role');
  }

  trf() {
    return localStorage.getItem('role');
  }


}
