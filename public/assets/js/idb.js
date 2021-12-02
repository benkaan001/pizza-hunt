// create variable to hold db connection
let db;
//establish a connection to IndexDB database called 'pizza_hunt' and set it to version 1
// this variable acts as an event listener for the database
// As part of the browser's window object, indexedDB is a global variable
// FIRST PARAMETER is the nmae of the IndexedDB database we would liek to create
// SECOND PARAMETER is the default version of the database
const request = indexedDB.open("pizza_hunt", 1);

//this event will emit if the database version changes
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store(aka table) called 'new_pizza', set it to have
  // an auto incrementing primary key of sorts
  db.createObjectStore("new_pizza", { autoIncrement: true });
};
