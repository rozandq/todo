import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Context } from 'vm';
import { CONTEXT } from '@angular/core/src/render3/interfaces/view';
import { PathCannotBeFragmentException } from '@angular-devkit/core';

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
  color : string;
  lineWidth : number;
  context : Context;



  constructor(private renderer: Renderer, private platform: Platform){
    this.color = '#2ecc71';
    this.lineWidth = 10;
  }

  ngOnInit() {}

  ngAfterViewInit(){
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;
    this.context = this.canvasElement.getContext('2d');

    //////// WARNING NOT DINAMYC
    this.renderer.setElementAttribute(this.canvasElement, "height", "420")
    ////////
  }

  startDrawing(event){
    console.log(event);

    this.previousX = event.touches[0].pageX;
    this.previousY = event.touches[0].pageY;

    let context = this.canvasElement.getContext('2d');
    context.lineJoin = 'round';
    context.beginPath();
    context.arc(this.previousX, this.previousY, this.lineWidth/2, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  moved(event){
    console.log("Moved : " + event);

    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;

    let context = this.canvasElement.getContext('2d');
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(this.previousX, this.previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.stroke();

    this.previousX = currentX;
    this.previousY = currentY;

  }

  changeColor(color : string){
    this.color = color;
  }

  clear(){
    this.context.rect(0, 0, 100, 50);
  }

}
