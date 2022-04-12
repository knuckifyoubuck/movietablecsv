import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Movie } from "../model/movie";
import { MovieService } from "./movie.service";
import { catchError, finalize } from "rxjs/operators";

export class MoviesDataSource implements DataSource<Movie> {

  private moviesSubject = new BehaviorSubject<Movie[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private movieService: MovieService) {

  }

  loadMovies( filter: string,
              genre1filter: string,
              genre2filter: string,
              sortValue: string,
              sortDirection: string,
              pageIndex: number,
              pageSize: number ) {

    this.loadingSubject.next(true);

    this.movieService.findMovies(filter, genre1filter, genre2filter, sortValue, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
        .subscribe(movies => {
          return this.moviesSubject.next(movies);
        });
  }

  connect(collectionViewer: CollectionViewer): Observable<Movie[]> {
    console.log("Connecting data source");
    return this.moviesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.moviesSubject.complete();
    this.loadingSubject.complete();
  }

}
