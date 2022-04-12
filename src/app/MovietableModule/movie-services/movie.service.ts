import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Movie } from "../model/movie";
import { SharingService } from "./movie.sharingdservice";

@Injectable()
export class MovieService {

  constructor(
    private http:HttpClient,
    public sharingService: SharingService,
  ) {

  }

  findMovies(
    filter='', genre1filter = '', genre2filter = '', sortValue='id', sortOrder='asc', pageNumber = 0, pageSize = 20
  ): Observable<Movie[]> {
    return this.http.get<any>('/api/movies', {
      params: new HttpParams()
        .set('filter', filter)
        .set('genre1filter', genre1filter)
        .set('genre2filter', genre2filter)
        .set('sortValue', sortValue)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      map(res => {
        this.sharingService.setRowCount(res['lineCount']);
        this.sharingService.setGenres(res['genres']);
        return res['payload']
      })
    );
  }

}
