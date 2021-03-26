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
  @ViewChild('pageNumber') pageNumber: ElementRef;
  @ViewChild('pageNumberContainer') pageNumberContainer: ElementRef;

  @ViewChild('pageTitle') pageTitle: ElementRef;




  @ViewChild('document') document: ElementRef;
  @ViewChild('card2') card2: ElementRef;
  @ViewChild('responsive') responsive: ElementRef;

  @ViewChildren ('pageSection') pages : QueryList<ElementRef>;

  scrollTop:number;

  selectedFirst:boolean;
  selectedSecond:boolean;
  selectedThird:boolean;

  currentPage=0;

  animationIsDone;

  modernScroll=true;

  scrollMode:string;

  currentTitle:string;
  currentImage:number;
  imagesList: any;
  imagesListNames:string[];
  selectedImage: any;

  viewInfo:boolean;

  selectedSub:number;
  multiplatform: boolean;
  titleDesing:string;
  bodyDesing:string;
  imgDesign:string;

  presentationNumber:number;



  constructor(private render: Renderer2,private scroller: ScrollDispatcher)
  { 
    this.selectedFirst=false;
    this.selectedSecond=false;
    this.selectedThird=false;
    this.animationIsDone=true;
    
    this.scrollMode=  this.modernScroll ? "Section Scroll" : "Normal Scroll" 
    let root=document.documentElement

    this.modernScroll ? root.style.setProperty('--scroll-view','none') : root.style.setProperty('--scroll-view','flex') 
    this.currentTitle="Bienvenidos"

    this.imagesList=["../../../assets/images/screenshots/library.png",
  "../../../assets/images/screenshots/message-closed.png",
  "../../../assets/images/screenshots/message-open.png",
  "../../../assets/images/screenshots/pays.png",
  "../../../assets/images/screenshots/teacher.png"]

  this.imagesListNames=["Biblioteca","Pagina Principal de mensajes","Interfaz de chats","Pagina de pagos","Vista de Creación de tareas"]


  this.selectedImage=this.imagesList[0]
  this.currentImage=0;

  this.viewInfo=false;
  this.selectedSub=-1;
  this.multiplatform=false;

  this.titleDesing="Interfaces Gráficas Limpias"
  this.bodyDesing="En click escuela cuidamos el aspecto de nuestras interfaces enfocándonos en una estructura limpia y sencilla, con una iconografía sutil y que contraste con la paleta de colores seleccionada. Tambien cuenta con animaciones que hacen la experiencia mas fluida"
    
  this.imgDesign="../../../assets/images/responsive.svg"

  this.presentationNumber=0;
  }

  changePage(page){
    this.currentPage=page;
    this.scrollPage()
  }

  changeSelectedSub(num:number){
    num!=this.selectedSub ? this.selectedSub=num: this.selectedSub=-1
    console.log(this.selectedSub)
  }

  changeScroll(){
    this.modernScroll=!this.modernScroll
    let root=document.documentElement

    this.modernScroll ? root.style.setProperty('--scroll-view','none') : root.style.setProperty('--scroll-view','flex') 
    
  }

  changeViewInfo(){
    this.viewInfo=!this.viewInfo
  }

  getimageDesign(){
    return this.imgDesign
  }


 


  ngOnInit() 
  {
    let root=document.documentElement
    root.style.setProperty('--opacity-var','0')
    window.addEventListener('scroll', this.scrolling, true);

    window.addEventListener('wheel', this.wheelingUp, { passive: false});
    window.addEventListener('keyup', this.keyNavigation,true)
  }

  keyNavigation=(s)=>
  {
    if (this.modernScroll)
    {
      s.preventDefault()
      s.stopPropagation()

     if(s.key=='ArrowUp')
     {
      if (this.currentPage==0)
      {
        this.currentPage=this.pages.length
      }
      else{
        this.currentPage--;
      }

      this.render.addClass(this.pageNumberContainer.nativeElement,'blob-top')

      setTimeout(()=>{this.render.removeClass(this.pageNumberContainer.nativeElement,'blob-top')},1000)
      this.scrollPage()

     }
     if(s.key=='ArrowDown')
     {
      if (this.currentPage==this.pages.length)
      {
        this.currentPage=0
      }
      else{
        this.currentPage++;
      }

      this.render.addClass(this.pageNumberContainer.nativeElement,'blob-bottom')

      setTimeout(()=>{this.render.removeClass(this.pageNumberContainer.nativeElement,'blob-bottom')},1000)
      this.scrollPage()

     }
    }
  }
  
  
  wheelingUp=(s)=>
  {
    
    if(this.modernScroll)
    {
 s.preventDefault()
  s.stopPropagation()

    if (this.animationIsDone)
    {
      this.animationIsDone=false;
 if (s.wheelDelta>0){
      if (this.currentPage==0)
      {
        this.currentPage=this.pages.length
      }
      else{
        this.currentPage--;
      }

      
      this.scrollPage()
      this.render.addClass(this.pageNumberContainer.nativeElement,'blob-top')

      setTimeout(()=>{this.render.removeClass(this.pageNumberContainer.nativeElement,'blob-top')},1000)
      
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

      
      this.scrollPage();
      this.render.addClass(this.pageNumberContainer.nativeElement,'blob-bottom')

      setTimeout(()=>{this.render.removeClass(this.pageNumberContainer.nativeElement,'blob-bottom')},1000)

      
    }

    let that =this;
    setTimeout(function(){that.animationIsDone=true},1000)

    
  }

    }
   
   

    

  }

  nextImage()
  {
   
    if (this.currentImage==this.imagesList.length-1)
      {
        this.currentImage=0
      }
      else{
        this.currentImage++;
      }



    this.selectedImage=this.imagesList[this.currentImage]
    console.log(this.currentImage)
  }

  prevImage(){
    if (this.currentImage==0)
    {
      this.currentImage=this.imagesList.length-1
    }
    else{
      this.currentImage--;
    }
    this.selectedImage=this.imagesList[this.currentImage]
    console.log(this.currentImage)

  }

  scrollPage()
  {
    const offset=this.pages.last.nativeElement.clientHeight*this.currentPage-25;
    console.log(offset)
    document.body.scrollTop=offset

  }

  navigateTo($event){
    this.currentPage=$event;
    this.scrollPage()
  }

  getScrollMode(){
    return this.modernScroll ? 'Scroll Section' : "Normal Scroll" 
  }


  scrolling=(s)=>
  {
    let sc = s.target.scrollTop;
    this.scrollTop=sc
   
    if (sc>723*2 )
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

     if(sc>723*4)
    {
      this.render.addClass(this.card2.nativeElement,"fade-in-row")
    }
    else
    {
      this.render.removeClass(this.card2.nativeElement,"fade-in-row")
    }
    
    this.calculatePage(sc,this.pages.last.nativeElement.clientHeight);
  }

 



showMultiplatform(){
  this.multiplatform=!this.multiplatform
  if (!this.multiplatform)
  {
  this.imgDesign="../../../assets/images/responsive.svg"
  this.titleDesing="Interfaces Gráficas Limpias"
  this.bodyDesing="En click escuela cuidamos el aspecto de nuestras interfaces enfocándonos en una estructura limpia y sencilla, con una iconografía sutil y que contraste con la paleta de colores seleccionada. Tambien cuenta con animaciones que hacen la experiencia mas fluida"
  }
  else{
    this.imgDesign="../../assets/images/logo-reduced.svg"
    this.titleDesing="Apto multiplataformas"
  this.bodyDesing="La aplicacion es completamente responsive, es decir, que esta diseñada y optimizada para poder ser utilizada en todos los dispositivos. Esto pensando en la facilidad de visualización en dispositivos moviles"
  }

  console.log(this.titleDesing)
  
}

getTitleDesign(){
return this.titleDesing
}

getBodyDesign(){
return this.bodyDesing
}

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

selectImage(num:number){
  this.currentImage=num;
  this.selectedImage=this.imagesList[num]
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
calculatePage(sc,height) 
{
  let calcPage=(Math.floor((sc-100)/height)+1)

  if (!this.modernScroll)
  {
  if(calcPage!=this.currentPage)
  {

   this.currentPage=calcPage
   
   console.log(this.currentPage)

  
  }
  }
 

  let root=document.documentElement
  

  let perPage=90/this.pages.length
  let hue=300/this.pages.length;

  let top=perPage*this.currentPage
  let huerotate=hue*this.currentPage

  root.style.setProperty('--page-top',top+'vh')
  root.style.setProperty('--hue-color',huerotate+'deg')

  if (this.currentPage>0){root.style.setProperty('--opacity-var','1')
  
 
  console.log(this.currentTitle,this.currentPage)
} 
else{
  root.style.setProperty('--opacity-var','0')
}
this.render.addClass(this.pageTitle.nativeElement,'twist')
var that= this;
setTimeout(function(){that.render.removeClass(that.pageTitle.nativeElement,'twist')},500)
  switch(this.currentPage){
    case 0 : this.currentTitle="Bienvenidos"; break
    case 1: this.currentTitle="Nuestro foco es la administracion."; break
    case 2: this.currentTitle="Queremos que ocupes un rol"; break
    case 3: this.currentTitle="Cuidamos el detalle."; break
    case 4: this.currentTitle="Asi nos presentamos"; break
    case 5: this.currentTitle="Te invitamos a subscribirte"; break
    case 6: this.currentTitle="Estamos a un click de distancia."; break
    default: this.currentTitle="Bienvenidos"; break
  } 

  
  
}
}


