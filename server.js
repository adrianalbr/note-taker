
//Require express, path, and fs
const express = require("express");
const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require('uuid');

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
    return res.json(JSON.parse(fs.readFileSync(path.join(__dirname,"db/db.json"))));
});

//Post routes

app.post("/api/notes", function (req, res){
    let newNoteRequest = req.body;
    console.log("New request: ", newNoteRequest);

    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname,"db/db.json")));
    
    notesArray.push(newNoteRequest);
    //setting the id
    newNoteRequest.id = uuidv4();

    fs.writeFileSync(path.join(__dirname,"db/db.json"), JSON.stringify(notesArray));

    res.json({
        isError: false,
        message: "Your note has been stored",
        port: PORT,
        status: 200,
        success: true
    });
});

//Delete routes
app.delete("/api/notes/:id", function (req, res){
    const notesArray = JSON.parse(fs.readFileSync(path.join(__dirname,"db/db.json")));
    //remove note using specific id
    let id = parseInt(req.params.id);
    let removeNote = notesArray.filter(item => item.id !=id);

    removeNote.forEach(element => element.id = removeNote.indexOf(element));

    fs.writeFileSync("./db/db.json", JSON.stringify(removeNote));

    res.json({
        isError: false,
        message: "Your note has been deleted",
        port: PORT,
        status: 200,
        success: true

    });

});

// Redirect to root 
app.get("*", function (req, res) {
    res.redirect('/');
});