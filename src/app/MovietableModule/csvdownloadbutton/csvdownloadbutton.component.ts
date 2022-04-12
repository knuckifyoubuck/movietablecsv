import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from "ngx-csv-parser";
import { SharingService } from "../movie-services/movie.sharingdservice";

@Component({
  selector: 'app-csvdownloadbutton',
  templateUrl: './csvdownloadbutton.component.html',
  styleUrls: ['./csvdownloadbutton.component.css']
})
@Injectable()
export class CsvdownloadbuttonComponent implements OnInit {

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private sharingService: SharingService) {
  }

  ngOnInit(): void {
  }

  @Output() redirect: EventEmitter<any> = new EventEmitter()
  csvRecords: any;
  header: boolean = true;

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], {header: this.header, delimiter: ';'})
      .pipe().subscribe({
      next: (result): void => {
        this.csvRecords = result;
        this.sharingService.setMovieData(this.csvRecords);
        this.sharingService.setDataSource(this.sharingService.getMovieData());
      },
      error: (error: NgxCSVParserError): void => {
        console.log('Error', error);
      }
    });
  }

}
