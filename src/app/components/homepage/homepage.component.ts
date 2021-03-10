import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener, ViewChildren, QueryList } from '@angular/core';
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

  @ViewChildren ('pageSection') pages : QueryList<ElementRef>;

  scrollTop:number;

  selectedFirst:boolean;
  selectedSecond:boolean;
  selectedThird:boolean;

  currentPage=0;

  animationIsDone;

  modernScroll=true;

  scrollMode:string;




  constructor(private render: Renderer2,private scroller: ScrollDispatcher)
  { 
    this.selectedFirst=false;
    this.selectedSecond=false;
    this.selectedThird=false;
    this.animationIsDone=true;
    
    this.scrollMode=  this.modernScroll ? "Section Scroll" : "Normal Scroll" 
    let root=document.documentElement

    this.modernScroll ? root.style.setProperty('--scroll-view','none') : root.style.setProperty('--scroll-view','flex') 
    
  }

  changeScroll(){
    this.modernScroll=!this.modernScroll
    let root=document.documentElement

    this.modernScroll ? root.style.setProperty('--scroll-view','none') : root.style.setProperty('--scroll-view','flex') 
    
  }

  scrollUp(){
    console.log("se esta haciendo scroll arriba")
  }
 


  ngOnInit() 
  {
    window.addEventListener('scroll', this.scrolling, true);

    window.addEventListener('wheel', this.wheelingUp, { passive: false});
  }
  
  
  wheelingUp=(s)=>
  {
    
    if(this.modernScroll)
    {
 s.preventDefault()
  s.stopPropagation()
    console.log(this.animationIsDone)

    if (this.animationIsDone)
    {
      
 if (s.wheelDelta>0){
      if (this.currentPage==0)
      {
        this.currentPage=this.pages.length
      }
      else{
        this.currentPage--;
      }

      
      const offset=this.pages.last.nativeElement.clientHeight*this.currentPage;
      
      document.body.scrollTop=offset
      console.log('Haciendo Wheel Arriba Page: ' +this.currentPage)
      
    }

    if (s.wheelDelta<0)
    {
      
      if (this.currentPage==this.pages.length)
      {
        this.currentPage=0
      }
      else{
        this.currentPage++;
      }

      console.log('Haciendo Wheel Abajo Page: ' +this.currentPage)
      
      const offset=this.pages.last.nativeElement.clientHeight*this.currentPage-25;
      
      document.body.scrollTop=offset
    }

    
  }

    }
   
   

    

  }

  getScrollMode(){
    return this.modernScroll ? 'Scroll Section' : "Normal Scroll" 
  }
 
  showInfo(){
    console.log(this.animationIsDone)
  }

  scrolling=(s)=>
  {
    let sc = s.target.scrollTop;
    console.log(sc);
    this.scrollTop=sc
   
    if (sc>723)
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
      this.render.addClass(this.card2.nativeElement,"fade-in-row")
    }
    else
    {
      this.render.removeClass(this.card2.nativeElement,"fade-in-row")
    }
    
  }

 

//   ngAfterViewInit() {
//     VanillaTilt.init(this.tilt1.nativeElement, {
//       max: 15,
//       speed: 400,
//       perspective:2000
//     });
// }

selectFirst()
{
  this.selectedFirst=!this.selectedFirst;
  if (this.selectedFirst)
  {

    this.selectedThird=false;
    this.selectedSecond=false;

  }
}

selectSecond()
{
  this.selectedSecond=!this.selectedSecond;
  if (this.selectedSecond)
  {
    this.selectedFirst=false;
    this.selectedThird=false;
  }
}

selectThird()
{
  this.selectedThird=!this.selectedThird;
  if (this.selectedThird){

    this.selectedSecond=false;
    this.selectedFirst=false
  }

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
