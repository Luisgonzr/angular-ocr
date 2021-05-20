import { Component, OnDestroy, OnInit } from '@angular/core';
import { OcrService } from '../ocr.service';

@Component({
  selector: 'app-out-put-text',
  templateUrl: './out-put-text.component.html',
  styleUrls: ['./out-put-text.component.scss']
})
export class OutPutTextComponent implements OnInit,OnDestroy {

  public listSubscribers: any[] = [];
  public textOut!: string;

  constructor(private ocrService:OcrService) { }

  ngOnInit(): void {
    this.listObserver();
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach(a => {
      a.unsubscribe()
    });;

  }

  listObserver = () => {
    const observer1$ = this.ocrService.cbText.subscribe(({ text }) => {
      this.textOut = text;
    });
    this.listSubscribers.push(observer1$);

  }

}
