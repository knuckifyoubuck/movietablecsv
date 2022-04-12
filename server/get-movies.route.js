"use strict";
exports.__esModule = true;
exports.getAllMovies = exports.MOVIES = void 0;
var csv = require('csv-parser');
var fs = require('fs');
exports.MOVIES = [];
function getAllMovies(req, res) {
    // TODO: Bug: moviesPage payload is empty on first request to the server (next OK)
    var movies = Object.values(exports.MOVIES);
    var lineCount = 0;
    fs.createReadStream('moviedata.csv')
        .pipe(csv({ separator: ';' })
        .on('data', function (data) {
        lineCount++;
        exports.MOVIES.length < lineCount ? exports.MOVIES.push(data) : null;
    })
        .on('end', function () {
        console.log('OK !');
    }));
    var queryParams = req.query;
    var filter = queryParams['filter'] || '', genre1filter = queryParams['genre1filter'] || '', genre2filter = queryParams['genre2filter'] || '', sortValue = queryParams['sortValue'], sortOrder = queryParams['sortOrder'], pageNumber = parseInt(queryParams['pageNumber']) || 0, pageSize = parseInt(queryParams['pageSize']);
    if (filter) {
        if (typeof filter === "string") {
            movies = movies.filter(function (movie) { return movie.name.trim().toLowerCase().search(filter.toLowerCase()) >= 0; });
        }
    }
    if (typeof sortValue == 'string') {
        movies.sort(function (a, b) {
            var isNumeric = function (num) { return !isNaN(num); };
            var left = (isNumeric(a[sortValue])) ? +a[sortValue] : a[sortValue];
            var right = (isNumeric(b[sortValue])) ? +b[sortValue] : b[sortValue];
            if (left < right) {
                return -1;
            }
            if (left > right) {
                return 1;
            }
            return 0;
        });
    }
    if (sortOrder == "desc") {
        movies = movies.reverse();
    }
    var genres1 = movies.map(function (obj) { return obj['genre1']; });
    var sortedGenres1 = Array.from(new Set(genres1));
    var genres2 = movies.map(function (obj) { return obj['genre2']; });
    var sortedGenres2 = Array.from(new Set(genres2));
    if (genre1filter || genre2filter) {
        if (typeof genre1filter == 'string' && typeof genre2filter == 'string') {
            if (genre1filter)
                movies = movies.filter(function (movie) { return movie.genre1 == genre1filter; });
            if (genre2filter)
                movies = movies.filter(function (movie) { return movie.genre2 == genre2filter; });
        }
    }
    var initialPos = pageNumber * pageSize;
    var moviesPage = movies.slice(initialPos, initialPos + pageSize);
    setTimeout(function () {
        res.status(200).json({
            payload: moviesPage,
            lineCount: exports.MOVIES.length,
            genres: {
                genres1: sortedGenres1,
                genres2: sortedGenres2
            }
        });
    });
}
exports.getAllMovies = getAllMovies;
