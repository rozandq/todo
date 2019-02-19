import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild("canvas") canvas : any;
  canvasElement : any;

  constructor(private renderer: Renderer, private platform: Platform){
    console.log("Start Tab 3");
  }

  ngAfterViewInit(){
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;

    //////// WARNING NOT DINAMYC
    this.renderer.setElementAttribute(this.canvasElement, "height", "420")
    ////////
  }

  startDrawing(event){
    console.log("Start drawning");
  }

  moved(event){
    console.log("Moved : " + event);
  }

}
