import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MessagingService } from './../messaging.service';
import { timer, ReplaySubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public messaging: any[] | undefined;
  public tampung: any[] | undefined;
  public tampung2: any[] | undefined;
  public pesan: any[] | undefined;
  public awal: any[] | undefined;
  public sender: any[] = [];
  public bot: any[] = [];
  public maxdate: string;
  public maxdate2: string;
  public cobo: any | undefined;
  public cbot: any[] | undefined;
  public menu: any[] = [];
  public lokasi: any[] = [];
  public penampung: any[] | undefined;
  // public cobo2: any | undefined;
  public click: boolean = false;
  public nama: string;
  public id: string;
  public file: string = '';
  dataForm: FormGroup;
  constructor(private messagingService: MessagingService, private formBuilder: FormBuilder, public datepipe: DatePipe) {
    this.dataForm = this.formBuilder.group({
      message: formBuilder.control('', [Validators.required])
    });
  }

  public control(name: string) {
    return this.dataForm.get(name);
  }

  ngOnInit() {

    this.messagingService.getMenu().subscribe((data) => {
      const menu = data;
      menu.forEach(data => {
        this.menu.push([data['id'], data['makanan'], data['harga']]);
      })
    })

    this.messagingService.getLokasi().subscribe((data) => {
      const lokasi = data;
      lokasi.forEach(data => {
        this.lokasi.push([data['id'], data['lokasi'], data['telepon']]);
      })
    })

    this.messagingService.getMe().subscribe((data) => {
      this.bot = data['result'];
    })

    const $message = new ReplaySubject(1);
    const obs2$ = timer(1000, 5000);
    obs2$.subscribe((d) => {
      this.messagingService.getUpdates().subscribe(data => {
        this.tampung = [data];
        const cobo = this.tampung[0].result;
        const pesan = cobo.filter(element => element.edited_message == null);
        this.cobo = [...new Map(cobo.map((item) => [item["message"]["chat"]["id"], item])).values()];
        pesan.forEach(data => {
          $message.next([data.message.text, data.message.date, data.message.from.is_bot, data.message.chat.id, data.message.from.first_name, data.message.from.last_name, data.message.chat.username, data.message.message_id]);
        });
      })
    })

    $message.subscribe(msg => {
      let message: string = '';
      if (this.nama == msg[4] && msg[1] > this.maxdate2) {
        this.maxdate2 = msg[1];
        if (msg[0] == "/menu") {
          const id = msg[3];
          this.menu.forEach((data) => {
            message = message + " " + data[0] + "." + " " + data[1] + "/" + " " + data[2] + "," + " "
          });
          this.messagingService.getMessaging(message, id).subscribe(data => {
            this.messaging = [data];
            this.sender.push([this.messaging[0].result.text, this.messaging[0].result.date, this.messaging[0].result.from.is_bot, this.messaging[0].result.chat.id]);
            console.log(this.messaging);
          })
        }
        if (msg[0] == "/mulai") {
          const id = msg[3];
          message = "Welcome, " + msg[4] + "," + " " + 'You can visit our website(www.youtube.com). ' + "There are List feature bot:  1. /menu, 2. /alamat, 3. /info, 4. /time. ";
          this.messagingService.getMessaging(message, id).subscribe(data => {
            this.messaging = [data];
            this.sender.push([this.messaging[0].result.text, this.messaging[0].result.date, this.messaging[0].result.from.is_bot, this.messaging[0].result.chat.id]);
          })
        }
        if (msg[0] == "/alamat") {
          const id = msg[3];
          this.lokasi.forEach((data) => {
            console.log(data);
            message = message + " " + data[0] + "." + " " + data[1] + "/" + " " + data[2] + "," + " "
          });
          this.messagingService.getMessaging(message, id).subscribe(data => {
            this.messaging = [data];
            this.sender.push([this.messaging[0].result.text, this.messaging[0].result.date, this.messaging[0].result.from.is_bot, this.messaging[0].result.chat.id]);
          })

          this.messagingService.location(id).subscribe(data => {
            this.messaging = [data];
            this.sender.push([this.messaging[0].result.location.latitude, this.messaging[0].result.date, this.messaging[0].result.from.is_bot, this.messaging[0].result.chat.id]);
          })
        }
        if (msg[0] == "/time") {
          let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy');
          let currentDateTime2 = this.datepipe.transform((new Date), 'h:mm:ss');
          const id = msg[3];
          message = "Date:  " + currentDateTime + ',' + ' ' + "Time: " + currentDateTime2;
          this.messagingService.getMessaging(message, id).subscribe(data => {
            this.messaging = [data];
            this.sender.push([this.messaging[0].result.text, this.messaging[0].result.date, this.messaging[0].result.from.is_bot, this.messaging[0].result.chat.id]);
            console.log(this.messaging);
          })
        }
        if (msg[0] == "/info") {
          const id = msg[3];
          if (msg[5]) {
            if (msg[6]) {
              message = "Your ID: " + msg[3] + ", " + "Your Message ID: " + msg[7] + ", " + "Your name: " + msg[4] + " " + msg[5] + ", " + "Your Username: @" + msg[6]
            } else {
              message = "Your ID: " + msg[3] + ", " + "Your Message ID: " + msg[7] + ", " + "Your name: " + msg[4] + " " + msg[5]
            }
          }
          else {
            if (msg[6]) {
              message = "Your ID: " + msg[3] + ", " + "Your Message ID: " + msg[7] + ", " + "Your name: " + msg[4] + ", " + "Your Username: @" + msg[6]
            } else {
              message = "Your ID: " + msg[3] + ", " + "Your Message ID: " + msg[7] + ", " + "Your name: " + msg[4]
            }
          }
          this.messagingService.getMessaging(message, id).subscribe(data => {
            this.messaging = [data];
            this.sender.push([this.messaging[0].result.text, this.messaging[0].result.date, this.messaging[0].result.from.is_bot, this.messaging[0].result.chat.id]);
            console.log(this.messaging);
          })
        }
        this.sender.push([msg[0], msg[1], msg[2], msg[3], msg[4]]);
      }
    })
  }


  open(nama: string, id: string) {
    this.click = true;
    this.nama = nama;
    this.id = id;
    this.messagingService.getUpdates().subscribe(data => {
      this.tampung2 = [data];
      const cobo = this.tampung2[0].result;
      // console.log(tampung);
      this.awal = [];
      const tampung = cobo.filter(element => element.edited_message == null);
      const text = [];
      const date = [];

      if (localStorage.getItem(this.nama) == null) {
        tampung.forEach((item) => {
          if (item.message.chat.first_name === this.nama) {
            text.push(item.message.text);
            date.push(item.message.date);
          }
        })
        const maxdate = Math.max.apply(null, date);
        this.maxdate2 = maxdate;
        localStorage.setItem(this.nama, maxdate);
        this.awal = text;
      } else {
        tampung.forEach((item) => {
          if (item.message.chat.first_name === this.nama) {
            date.push(item.message.date);
          }
        })
        const maxdate = Math.max.apply(null, date);
        this.maxdate2 = maxdate;
      }
    })
  }

  // selectedFile: File = null;

  // onFileChange(event) {
  //   this.selectedFile = <File>event.target.files[0];
  // }

  // onUpload(){
  //   const filedata= new FormData();
  //   filedata.append('image', this.selectedFile, this.selectedFile.name)
  //   this.http.post('https:')
  // }

  submit(id: string) {
    const message = this.control('message').value;
    this.dataForm.reset();
    const url = "https://api.telegram.org/bot5035666714:AAFiboQ-1LBElXBJQ8TBl8kPTjQWluF--uk/sendMessage?chat_id=" + id + "&text=" + message;
    this.messagingService.getMessaging(message, id).subscribe(data => {
      this.messaging = [data];
      this.sender.push([this.messaging[0].result.text, this.messaging[0].result.date, this.messaging[0].result.from.is_bot, this.messaging[0].result.chat.id, this.messaging[0].result.from.first_name]);
    })
  }
}

