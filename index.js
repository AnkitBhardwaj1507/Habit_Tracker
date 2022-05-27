const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const path = require('path');
const db = require('./config/mongoose');

//Server Port
const port = 8000;

//Static files
app.use(express.static("./assets"));

// Body parser
app.use(express.urlencoded());


// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set('views',path.join(__dirname, 'views'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Routes
app.use("/", require('./routes'));

// Start the server
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});