import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { recognize } from 'tesseract.js';
import { OcrService } from '../ocr.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

  @ViewChild('outputImage')
  outputImage!: ElementRef;
  @ViewChild('inputImage')
  inputImage!: ElementRef;
  public openSidebar = false;
  public listSubscribers: any[] = [];
  public loading: any;
  public image: any;
  public worker: any;
  public cx!: CanvasRenderingContext2D;

  constructor(private ocrService: OcrService) { }

  ngOnInit(): void {
    this.listObserver();
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach(a => {
      a.unsubscribe()
    });;

  }

  toggleMenu = () => {
    this.openSidebar = !this.openSidebar;
  }

  listObserver = () => {
    const observer1$ = this.ocrService.cbImage.subscribe(({ src }) => {
      console.log(src);
      this.image = src;
      this.openSidebar = true;
    });
    this.listSubscribers.push(observer1$);

  }


  /**
   * AQUI EMPIEZA LO BUENO
   */

  loadingProgress = (logger: any) => {
    console.log(logger);
  }

  iniSetup = () => {
    const canvasElement = this.outputImage.nativeElement;
    const imagenElement = this.inputImage.nativeElement;
    const { naturalWidth, naturalHeight } = imagenElement;
    console.log(naturalHeight, naturalWidth);
    this.cx = canvasElement.getContext('2d');
    this.cx.lineWidth = 5;
    this.cx.lineCap = 'square';
    this.cx.strokeStyle = 'green';
    canvasElement.width = naturalWidth;
    canvasElement.height = naturalHeight;
    this.initialization();
  }

  draw = (dataIn: any) => {
    dataIn.words.forEach((w: any) => {
      const bounding = w.bbox;
      this.cx.strokeStyle = 'red';
      this.cx.strokeRect(bounding.x0, bounding.y0, bounding.x1 - bounding.x0, bounding.y1-bounding.y0);
      this.cx.beginPath();
      //this.cx.moveTo(w.baseline.x0,w.baseline.y0);
      //this.cx.lineTo(w.baseline.x1,w.baseline.y1);
      this.cx.stroke();
    });
  }

  initialization = async () => {
    this.loading = true;
    const imagenElement = this.inputImage.nativeElement;
    const {data} = await recognize(imagenElement, 'eng', {
      logger: m => this.loadingProgress(m)
    });
    this.draw(data);
    console.log('FINALIZO ----------------->', data);
    this.ocrService.cbText.emit(data);
  }

  loadedImage = () => {
    //this.initialization();
    this.iniSetup();
    console.log('IMAGEN LISTA');
  }

}
