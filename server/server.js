"use strict";
exports.__esModule = true;
var express = require("express");
var get_movies_route_1 = require("./get-movies.route");
var app = express();
app.route('/api/movies').get(get_movies_route_1.getAllMovies);
var httpServer = app.listen(9000, function () {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});
