
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu, ILokasi } from './messaging';

@Injectable()
export class MessagingService {
  data: Observable<Object>;
  value: any;
  parameter: Observable<any[]>;
  private _url: string = '/assets/data/menu.json';
  private _url2: string = '/assets/data/lokasi.json';
  constructor(private http: HttpClient) { }

  getMessaging(message: string, id: string) {
    let url = "https://api.telegram.org/bot5025951968:AAHWHjD1BGTMQs6qH8RsjCcRwtSSFkeLVAo/sendMessage?chat_id=" + id + "&text=" + message;
    return this.http.get(url);
  }

  getUpdates() {
    let url = 'https://api.telegram.org/bot5025951968:AAHWHjD1BGTMQs6qH8RsjCcRwtSSFkeLVAo/getUpdates';
    return this.http.get(url);
  }

  getMe() {
    let url = 'https://api.telegram.org/bot5025951968:AAHWHjD1BGTMQs6qH8RsjCcRwtSSFkeLVAo/getMe';
    return this.http.get(url);
  }

  location(id: string) {
    let url = `https://api.telegram.org/bot5025951968:AAHWHjD1BGTMQs6qH8RsjCcRwtSSFkeLVAo/sendLocation?latitude=-6.2552333&longitude=106.6164091&chat_id=${id}`
    return this.http.get(url);
  }
  parseMode(id: string, message: string) {
    let url = `https://api.telegram.org/bot5025951968:AAHWHjD1BGTMQs6qH8RsjCcRwtSSFkeLVAo/sendMessage?chat_id=${id}&text=${message}&parse_mode=HTML`
    return this.http.get(url);
  }

  getMenu(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(this._url)
  }

  getLokasi(): Observable<ILokasi[]> {
    return this.http.get<ILokasi[]>(this._url2)
  }
}
