
//Require express
const express = require("express");

//Create instance of express
const app = express();

//Set the port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());