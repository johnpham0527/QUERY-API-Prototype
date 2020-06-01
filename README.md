# QUERY-API-Prototype

## Summary

This project is a prototype API for the Queens Public Library System:

__QUERY - QUEens public library Research Yielder__

The purpose of this project is to create and maintain a database that keeps track of programs (or events) that are hosted by the various Queens public libraries. The database not only stores the time and date, but also the library the event was held at, the person presenting, as well as the number of attendees classified by age. A more detailed Schema will appear below.

This API was built with Express, Nodejs and MongoDB. 

[Deployed root node on Heroku](https://query-api-prototype.herokuapp.com/api/)

## API Routes

All routes return JSON data or error codes as strings 

#### Libraries 

  * GET /api/libraries - get all libraries (only name and id) as an array 
  
  * POST /api/libraries/newLibrary - create a new library database item. will eventually be access restricted 
  
  * Edit and delete for libraries coming soon 
  
#### Presenters 

  * GET /api/presenters - get all presenters in the database 
  
  * POST /api/presenters/newPresenter - create a new presenter entry
  
#### Programs 

  * GET /libraries/name/:libraryName - get all the programs hosted by that library, as an array. the name finder is case insensitive, but in the url spaces should be replaced with dashes '-' or underscores '_'
  
  * GET /libraries/id/:libraryId - get all the program hosted by that library, as an array 
  
  * POST /libraries/new - make a new program in the database (the id needs to point to an existing library in the db but it will fill in the correct library name)
  
  
  * PUT /libraries/edit/:id - edit a program called by its id. see schema of Program for more details 
  
  * DELETE /libraries/delete/:id - delete a program called by its id
  
## Schemas

#### Library
```js
const Library = new Schema({
  // schema fields here 
  name: { type: String, required: true },
  address: { type: String, required: true },
  programs: {
    type: [Schema.Types.ObjectId], required: true, refPath: "programs"
  }

}, {
  timestamps: true
})
```

##### Library Notes
  * When the GET libraries request is made, only the name and id are returned

#### Presenter
```js
const Presenter = new Schema({
  // schema fields here 
  name: { type: String, required: true }

}, {
  timestamps: true
})
```
##### Presenter Notes
  * Currently, only linked to from Program schema

#### Program
```js
const Program = new Schema({
  // schema fields here 
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  library: { type: Schema.Types.ObjectId, required: true },
  libraryName: { type: String, required: true },
  category: { type: String, required: true },
  presenter: { type: Schema.Types.ObjectId },
  attendees: {
    type: {
      childrenAttendees: Number,
      teenAttendees: Number,
      adultAttendees: Number,
      seniorAttendees: Number
    }, required: true
  }
}, {
  timestamps: true
})
```
##### Program Notes
  * POST requests: a valid library id is needed. The server finds the library's name and fills it in so the library's name does not have to be spelled perfectly in the post request
  * POST requests: also automatically adds this program to the correct library's array of programs
  * PUT requests: current iteration does not allow library to be changed (will remove any changed library id's or names). This is also because the system is not built to automatically remove this program from a given library and then update the next library. However, a program can be deleted and the corresponding library must have its programs array manually updated.
