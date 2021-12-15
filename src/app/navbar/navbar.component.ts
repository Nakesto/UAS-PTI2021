import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Emitters } from '../emitters/emitter';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  title = 'UAS-PTI';
  cek: boolean;
  role: string;
  name: any;
  authenticated = localStorage.getItem('role');

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: string) => {
        if (localStorage.getItem('role')) {
          this.authenticated = localStorage.getItem('role');
        } else {
          this.authenticated = auth;
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('role');
    this.authenticated = '';
  }
}
