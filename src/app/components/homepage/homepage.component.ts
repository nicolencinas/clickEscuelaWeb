import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild('card1') card1: ElementRef;
  @ViewChild('svgUp') svgUp: ElementRef;
  @ViewChild('svgDown') svgDown: ElementRef;
  @ViewChild('pathLines') pathLines: ElementRef;
  @ViewChild('textLogo') textLogo: ElementRef;


  @ViewChild('document') document: ElementRef;
  @ViewChild('card2') card2: ElementRef;
  @ViewChild('tilt1') tilt1: ElementRef;

  scrollTop:number;

  selectedFirst:boolean;


  constructor(private render: Renderer2,private scroller: ScrollDispatcher)
  { 
    this.selectedFirst=false;
  }

 


  ngOnInit() 
  {
    window.addEventListener('scroll', this.scrolling, true);
  }

 

  scrolling=(s)=>
  {
    let sc = s.target.scrollTop;
    console.log(sc);
    this.scrollTop=sc
   
    if (sc>600)
    {
      this.render.addClass(this.card1.nativeElement,"fade-in-row")
      this.render.addClass(this.svgDown.nativeElement,"addDownAnimation")
      this.render.addClass(this.svgUp.nativeElement,"addUpAnimation")
      this.render.addClass(this.pathLines.nativeElement,"animate-conectors")
      this.render.addClass(this.textLogo.nativeElement,"text-logo")

    
    }else{
      this.render.removeClass(this.card1.nativeElement,"fade-in-row")
      this.render.removeClass(this.svgDown.nativeElement,"addDownAnimation")
      this.render.removeClass(this.svgUp.nativeElement,"addUpAnimation")
      this.render.removeClass(this.pathLines.nativeElement,"animate-conectors")
      this.render.removeClass(this.textLogo.nativeElement,"text-logo")


    }

     if(sc>1200)
    {
      console.log(this.card2)
      this.render.addClass(this.card2.nativeElement,"fade-in-row")
    }
    else
    {
      console.log(this.card2)
      this.render.removeClass(this.card2.nativeElement,"fade-in-row")
    }
    
  }

 

  ngAfterViewInit() {
    VanillaTilt.init(this.tilt1.nativeElement, {
      max: 15,
      speed: 400,
      perspective:2000
    });
}

selectFirst()
{
  this.selectedFirst=!this.selectedFirst;
}
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
