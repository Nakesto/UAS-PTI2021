import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

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

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const obs$ = timer(1000, 5);
    obs$.subscribe((d) => {
      this.role = localStorage.getItem('role');
    })
  }

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['']);
    this.role = localStorage.getItem('role');
  }
}
