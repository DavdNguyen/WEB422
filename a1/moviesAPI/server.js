/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: David Nguyen    Student ID: 104458179   Date: May 26, 2023
 * Cyclic Link:
 *
 ********************************************************************************/

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

db.initialize(process.env.MONGODB_CONN_STRING)
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`server listening on: ${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// HOME PAGE
app.get("/", (req, res) => {
    res.json({message: "API Listening"});
});

// ADD NEW MOVIE
app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body)
        .then((movie) => {
            res.status(201).json(movie);
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

// GET MOVIES
app.get("/api/movies", (req, res) => {
    const {page, perPage, title} = req.query;
    db.getAllMovies(page, perPage, title)
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

// GET MOVIE
app.get("/api/movies/:id", (req, res) => {
    const {id} = req.params;
    db.getMovieById(id)
        .then((movie) => {
            res.status(201).json(movie);
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

// UPDATE MOVIE
app.put("/api/movies/:id", (req, res) => {
    const {id} = req.params;
    const updatedData = req.body;
    db.updateMovieById(updatedData, id)
        .then(() => {
            res.status(201).json({message: "Movie successfully updated"});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

// REMOVE MOVIE
app.delete("/api/movies/:id", (req, res) => {
    const {id} = req.params;
    db.deleteMovieById(id)
        .then(() => {
            res.status(201).json({message: "Movie successfully removed"});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

// 404 PAGE NOT FOUND
app.use((req, res) => {
    res.status(404).send("Resource not found");
});