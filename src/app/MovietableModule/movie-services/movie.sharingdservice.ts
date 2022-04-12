import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService{

  private dataSource: any;
  private rowCount: any;
  private genres: any;

  setDataSource(dataSource: any) {
    this.dataSource = dataSource;
  }

  getDataSource(): any {
    return this.dataSource;
  }

  setRowCount(rowCount: any) {
    this.rowCount = rowCount;
  }

  getRowCount(): any {
    return this.rowCount;
  }

  setGenres(genres: any) {
    this.genres = genres;
  }

  getGenres(): any {
    return this.genres;
  }

}
