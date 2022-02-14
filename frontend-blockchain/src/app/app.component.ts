import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showHeader = false;
  peerName = '';

  constructor(private service: AppService, private message: NzMessageService) {
  }

  setUrl(url: string, name: string) {
    this.service.setUrlAndName(url, name);
    this.peerName = name;
    this.showHeader = true;
    this.welcomeMessage();
  }

  welcomeMessage(): void {
    this.message.create('success', `Welcome, ${this.peerName}!`);
  }
}
