import { Request, Response } from 'express';
const csv = require('csv-parser')
const fs = require('fs')
export const MOVIES: any[] = [];

export function getAllMovies(req: Request, res: Response) {
  // TODO: Bug: moviesPage payload is empty on first request to the server (next OK)

  let movies = Object.values(MOVIES);

  let lineCount = 0;
  fs.createReadStream('moviedata.csv')
    .pipe(csv({ separator: ';'})
      .on('data', (data: any) => {
        lineCount++;
        MOVIES.length < lineCount ? MOVIES.push(data) : null;
      })
      .on('end', () => {
        console.log('OK !');
      })
    )

  const queryParams = req.query;

  const
    filter = queryParams['filter'] || '',
    genre1filter = queryParams['genre1filter'] || '',
    genre2filter = queryParams['genre2filter'] || '',
    sortValue = queryParams['sortValue'],
    sortOrder = queryParams['sortOrder'],
    pageNumber = parseInt(<string>queryParams['pageNumber']) || 0,
    pageSize = parseInt(<string>queryParams['pageSize']);

  if (filter) {
    if (typeof filter === "string") {
      movies = movies.filter((movie: { name: string; })  => movie.name.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }
  }

  if(typeof sortValue == 'string') {
    movies.sort(function (a,b) {
      let isNumeric = (num: any) => !isNaN(num);

      var left = (isNumeric(a[sortValue])) ? +a[sortValue] : a[sortValue];
      var right = (isNumeric(b[sortValue])) ? +b[sortValue] : b[sortValue];

      if ( left < right ){
        return -1;
      }
      if ( left > right ){
        return 1;
      }
      return 0;
    });
  }

  if (sortOrder == "desc") {
    movies = movies.reverse();
  }

  let genres1 = movies.map(obj => obj['genre1']);
  let sortedGenres1 = Array.from(new Set(genres1));
  let genres2 = movies.map(obj => obj['genre2']);
  let sortedGenres2 = Array.from(new Set(genres2));

  if(genre1filter || genre2filter) {
    if(typeof genre1filter == 'string' && typeof genre2filter == 'string' ) {
      if (genre1filter) movies = movies.filter(movie => movie.genre1 == genre1filter);
      if (genre2filter) movies = movies.filter(movie => movie.genre2 == genre2filter);
    }
  }

  const initialPos = pageNumber * pageSize;

  const moviesPage = movies.slice(initialPos, initialPos + pageSize);

  setTimeout(() => {
    res.status(200).json({
      payload: moviesPage,
      lineCount: MOVIES.length,
      genres: {
        genres1: sortedGenres1,
        genres2: sortedGenres2
      }
    });
  });

}
