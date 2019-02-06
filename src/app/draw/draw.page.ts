import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.page.html',
  styleUrls: ['./draw.page.scss'],
})
export class DrawPage implements OnInit {

  @ViewChild("canvas") canvas : any;
  canvasElement : any;
  previousX : number;
  previousY : number;

  constructor(private renderer: Renderer, private platform: Platform){
    console.log("Start Tab 3");
  }

  ngOnInit() {}

  ngAfterViewInit(){
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;

    //////// WARNING NOT DINAMYC
    this.renderer.setElementAttribute(this.canvasElement, "height", "420")
    ////////
  }

  startDrawing(event){
    console.log("Start drawning");

    this.previousX = event.touches[0].pageX;
    this.previousY = event.touches[0].pageY;
  }

  moved(event){
    console.log("Moved : " + event);

    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;

    let context = this.canvasElement.getContext('2d');
    context.join = 'round';
    context.beginPath();
    context.moveTo(this.previousX, this.previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = '#123'
    context.stroke();

    this.previousX = currentX;
    this.previousY = currentY;

  }

  click(event){
    console.log("click");
  }

}
