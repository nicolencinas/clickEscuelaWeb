import { animate, state, style, transition, trigger } from '@angular/animations';
import {Component, OnInit, Input, Directive, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import {} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { HomepageComponent } from '../homepage/homepage.component';


@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss'],
  animations: [
    trigger('changeDisplay', [
      state('notifications-hide', style({
        display: 'none'
      })),
      state('notifications-show', style({
        display: 'block'
      })),
      transition('notifications-hide=>notifications-show', animate('4500ms')),
      transition('notifications-show=>notifications-hide', animate('4000ms'))
    ]),
  ]
})
export class MainmenuComponent implements OnInit {
  showFiller = true;
  notificationShow = false;
  notificationsDisplay = 'col-2 notifications-show';
  dinamicDisplay = 'col-10 size-display-dinamic';
  notificationChild = false;
  dashboard = 'Cant. Aprobados';
  checked = false;
  classMenu = 'menu';
  blockDinamicActually = 'homepage';
  sidenavClass = 'sidenav-open';
  showHomeButton = false;

  currentNotification: Notification;
  isNotification: boolean;
  numberNotifications: number;

  @ViewChild('drawer', { static: true }) sidenav: MatSidenav;
  @ViewChild(HomepageComponent) home: HomepageComponent;
  @ViewChild('menuNav', { static: true }) menuNav: ElementRef;
  @Input() delay = 300;

  routeLink: string;

  constructor() { }

  theEvent$;

  

  hideNotificaction() {
    if (!this.notificationChild) {

      this.notificationShow = false;
      this.dinamicDisplay = 'col-10 size-display-dinamic';

    }
  }
  receiveChange($event) {
    this.notificationChild = $event;
  }

  receiveNotificationsNumber($event) {
    this.numberNotifications = $event;
  }

  receiveNotification($event) {
    this.currentNotification = $event;
    this.isNotification = true;
    this.changeBlock($event.type == 'Tarea' ? 'homework' : 'grade');

  }

  changeBlock(newBlock: string) {
    console.log(this.showHomeButton);
    this.showHomeButton = newBlock != 'home' ? true : false;
    this.blockDinamicActually = newBlock;
    console.log(newBlock)
  }

  notNotification() {
    this.isNotification = false;
  }

  ngOnInit() {
    this.sidenav.open();

    //console.log(this.router.url)

  }



}
