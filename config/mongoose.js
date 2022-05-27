const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/habit_tracker');

// check the connection
const db = mongoose.connection;

// on error
db.on('error', console.error.bind(console, "Error connecting to MongoDb"));

// if server is up and running
db.once('open', function(){
    console.log("Connected to Database :: MongoDB");
});

module.exports = db;