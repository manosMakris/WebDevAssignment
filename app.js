// Require modules
const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/bookRouter");
const morgan = require("morgan");

// Create the server
const app = express();

// Connect to database
const username = 'testUser';
const password = 'testPassword123';
const database_name = 'HuaDatabase';
const connectionURI = `mongodb+srv://${username}:${password}@tutorialcluster.sbqvlzz.mongodb.net/${database_name}?retryWrites=true&w=majority`;

mongoose.connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to database");
        // Make the server listen for requests
        const host = 'localhost';
        const port = 3000;
        const website_url = `http://${host}:${port}/`;
        app.listen(port, () => {
            console.log(`Server up and running in url: ${website_url}`);
        })
    }).catch((err) => {
        console.log(err);
    });

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/books', bookRouter);