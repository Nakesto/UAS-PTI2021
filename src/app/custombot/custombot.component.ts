import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { MessagingService } from './../messaging.service';

@Component({
  selector: 'app-custombot',
  templateUrl: './custombot.component.html',
  styleUrls: ['./custombot.component.css']
})
export class CustombotComponent implements OnInit {
  public cbot: any[] | undefined;
  public menu: any[] | undefined;
  public penampung: any[] | undefined;
  public messaging: any[] | undefined;
  public nampung: any[] | undefined;
  public pesan3: any[] | undefined;
  public sender: any[] = [];
  public bot: any[] = [];
  public tanggal: string;
  public tanggal2: string;
  public coba: any | undefined;
  // public coba2: any | undefined;
  public click: boolean = false;
  public nama: string;
  public id: string;

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    this.messagingService.getMenu().subscribe(
      (data) => (this.menu = data))


  }



}
