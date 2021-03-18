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

  hamburgerMenu:boolean;
  secondPage:boolean;
  @Input() selectedIndex;

  @Output() navigation = new EventEmitter<number>();

  navigateTo(value :number)
  {
    this.navigation.emit(value) 
  }

  constructor() 
  {
    this.hamburgerMenu=false;
  }


  changeButtonState(){
    this.hamburgerMenu=!this.hamburgerMenu
    this.secondPage=false;
  }

  changeOptionPage(){
    this.secondPage=!this.secondPage
  }

  

  ngOnInit() {

    //console.log(this.router.url)

  }



}
