const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
    }).catch((err)=>{
    console.log(err);
});

app.get('/', (req, res) => {
    res.json({message: "API Listening"});
})

app.post('/api/movies', (req, res) => {
    // This route uses the body of the request to add a new "Movie" document 
    // to the collection and return the newly created movie object / fail message to the client.

    db.addMovie(req.body).then((movie) => {
        
    })

})

app.use((req, res) => {
    res.status(404).send('Resource not found');
});


app.listen(HTTP_PORT, () => {
    console.log('Ready to handle requests on port ' + HTTP_PORT);
});



