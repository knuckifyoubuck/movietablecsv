import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from './app.component';
import { MovietableComponent } from './MovietableModule/movietable/movietable.component';
import { MovieService } from "./MovietableModule/movie-services/movie.service";



@NgModule({
  declarations: [
    AppComponent,
    MovietableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatSliderModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxCsvParserModule,
    RouterTestingModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
