import * as express from 'express';
import { Application } from "express";
import {getAllMovies} from "./get-movies.route";

const app: Application = express();

app.route('/api/movies').get(getAllMovies);

const httpServer:any = app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});
