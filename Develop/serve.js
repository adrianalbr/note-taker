
//Require express, path, and fs
const express = require("express");
const path = require("path");
const fs = require("fs");

//require array of notes from db.json
const notesArray = require("./db/db.json");

//Create instance of express
const app = express();

//Set the port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use public root folder
app.use(express.static(__dirname + '/public'));

//Listen
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

  //Routes

  //Get routes

  app.get("/", function (req, res){
      res.sendFile(path.join(__dirname, "public/index.html"));
  });

  app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res){
    return res.json(JSON.parse(fs.readFileSync(".db/db.json")));
});

//Post routes

app.post("/api/notes", function (req, res){
    let newNoteRequest = req.body;
    console.log("New request: ", newNoteRequest);

    notesArray.push(newNoteRequest);
    //setting the id
    newNoteRequest.id = notesArray.indexOf(newNoteRequest);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));

    res.json({
        isError: false,
        message: "Your note has been stored",
        port: PORT,
        status: 100,
        success: true
    });
});

//Delete routes
app.delete

