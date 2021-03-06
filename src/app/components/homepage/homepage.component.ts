import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild('card1') card1: ElementRef;
  @ViewChild('document') document: ElementRef;

  @ViewChild('card2') card2: ElementRef;
  @ViewChild('card3') card3: ElementRef;


  constructor(private render: Renderer2) { 
  
  }

 


  ngOnInit() 
  {
    this.render.listen('window','scroll', ($event)=>{
      console.log($event)
    })
  }

  ngAfterViewInit()
  {
    
    this.render.listen("document",'keydown',($event) =>
    {
      this.render.addClass(this.card1.nativeElement,"fade-in-row")
    })

  

   
  }

  // ngAfterViewInit() {
  //   VanillaTilt.init(this.card1.nativeElement, {
  //     max: 15,
  //     speed: 400,
  //     perspective:2000
  //   });

  //   VanillaTilt.init(this.card2.nativeElement, {
  //     max: 15,
  //     speed: 400,
  //     glare: false,
  //     "max-glare":1
  //   });

  //   VanillaTilt.init(this.card3.nativeElement, {
  //     max: 15,
  //     speed: 400
  //   });
  // }

}
