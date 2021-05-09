## App description

My App shows users different photos of cats.

- When the App loads for a first time it shows random photos of cats with some details about them and set of buttons
  with names of categories of sorting cat photos We have two requests (fetch)
  to the api. We receive two arrays of data after requesting. We take this data and show the list of buttons and the
  list of random photos.
- User can choose one category by clicking on the button with its name, and my App will show all the photos of cats from
  that category. Here we have different requests with adding to the end of this request name of category and depending
  on the request we have different data from the api and different list of photos.

## How to start this project

- Run index.html using any http server (to avoid CORS issues)
    1. You can install https://www.npmjs.com/package/http-server globally
    2. Run command `http-server --proxy http://localhost:3000?` to run server at 3000 port and
       open http://localhost:3000 inside your browser
