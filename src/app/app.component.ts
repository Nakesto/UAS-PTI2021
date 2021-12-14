import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Auth/auth.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UAS-PTI';
  cek: boolean;
  role: string;

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {

  }


}
