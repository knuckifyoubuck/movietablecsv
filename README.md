# Movies Table Csv

## Directories
- `server` - API for storing and parsing csv data on `http://localhost:9000/`
  - `moviedata.csv` - csv file with movies list
  - `server. ts` - entry point
  - `get-movies.route.ts` - API route
- `src` - Angular main files for table visualisation 
### Setup
To compile and start server install typescript 
1. Run `tsc server.ts` in `movietablecsv/server` directory
2. Run `node server`
3. Run `ng serve` in new terminal.  
4. Navigate to `http://localhost:4200/`.

***TODO*** *Bug:* movies payload is empty on first request to the server (all next OK)
