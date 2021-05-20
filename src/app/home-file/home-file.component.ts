import { Component, OnInit } from '@angular/core';
import { OcrService } from '../ocr.service';

@Component({
  selector: 'app-home-file',
  templateUrl: './home-file.component.html',
  styleUrls: ['./home-file.component.scss']
})
export class HomeFileComponent implements OnInit {

  listImages = [
    {
      src: 'a.png'
    },
    {
      src: 'a.png'
    },
    {
      src: 'a.png'
    }
  ];


  constructor(private ocrService: OcrService) {

  }

  ngOnInit(): void {
  }

  clickImage = (image: any) => {
    this.ocrService.cbImage.emit(image);
  }

}
