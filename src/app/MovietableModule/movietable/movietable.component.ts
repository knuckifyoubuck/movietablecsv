import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../model/movie';
import { SharingService } from "../movie-services/movie.sharingdservice";
import { MovieService } from "../movie-services/movie.service";
import { MoviesDataSource } from "../movie-services/movie.datasource";
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from "rxjs";
import { MatSelect } from "@angular/material/select";

@Component({
  selector: 'app-movietable',
  templateUrl: './movietable.component.html',
  styleUrls: ['./movietable.component.css']
})

export class MovietableComponent implements OnInit, AfterViewInit {

  movie: Movie;
  displayedColumns: string[] = ['id', 'name', 'genre1', 'genre2', 'year'];
  dataSource: MoviesDataSource;
  lineCount: number;
  selectedGenre1Filter: string;
  selectedGenre2Filter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchinput') searchinput: ElementRef;
  @ViewChild('genre1filter') genre1filter: MatSelect;
  @ViewChild('genre2filter') genre2filter: MatSelect;


  constructor (
    public sharingService: SharingService,
    public movieService: MovieService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.movie = this.route.snapshot.data["movie"]
    this.sharingService.setDataSource(new MoviesDataSource(this.movieService));
    this.sharingService.getDataSource().loadMovies();
  }

  ngAfterViewInit() {
    fromEvent(this.searchinput.nativeElement,'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadMoviesPages();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.genre1filter.valueChange, this. genre2filter.valueChange)
      .pipe(
        tap(() => this.loadMoviesPages())
      )
      .subscribe();
  }

  loadMoviesPages() {
    this.sharingService.getDataSource().loadMovies(
      this.searchinput.nativeElement.value,
      this.genre1filter.value,
      this.genre2filter.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

}

