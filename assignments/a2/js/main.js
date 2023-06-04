/*********************************************************************************
 * WEB422 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: David Nguyen    Student ID: 104458179   Date: June 1, 2023
 *
 ********************************************************************************/

let page = 1; // page counter
var perPage = 10; // num of movies per page
let base = `https://tough-pig-tiara.cyclic.app`; // base API URL

function loadMovieData(title = null) {
    console.log(title);
    let pagination = document.querySelector(".pagination");
    // set URL for fetching
    if (title !== null && title !== '') {
        page = 1;
        url =
            base + `/api/movies?page=${page}&perPage=${perPage}&title=${title}`; // filter movies by title
        pagination.classList.add("d-none");
    } else {
        url = base + `/api/movies?page=${page}&perPage=${perPage}`; // get all movies
        pagination.classList.remove("d-none"); // show pagination controls
    }
    getMovieData(url)
        .then((data) => {
            document.querySelector("#moviesTable tbody").innerHTML =
                generateTableRows(data); // add row elements to table
            document.getElementById("current-page").textContent = page; // update current page num
            addClickEvents(document.querySelectorAll(".movieRow")); // add click events to table rows
        })
        .catch((err) => {
            console.log(err);
        });
}

// calls API using given URL
function getMovieData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((data) => {
                resolve(data.json());
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// takes tables rows and adds click events to each
function addClickEvents(tableRows) {
    tableRows.forEach((row) => {
        row.addEventListener("click", () => {
            id = row.getAttribute("data-id");
            url = base + `/api/movies/${id}`;
            getMovieData(url)
                .then((movie) => {
                    let pagination = document.querySelector(".pagination");
                    document.querySelector(
                        "#detailsModal .modal-title"
                    ).textContent = movie.title;
                    document.querySelector(
                        "#detailsModal .modal-body"
                    ).innerHTML = `
                ${
                    movie.poster
                        ? `<img class="img-fluid w-100" src="${movie.poster}"`
                        : `<img class="img-fluid w-100" src=""`
                }<br><br>
                <strong>Directed By:</strong> ${movie.directors.join(
                    ", "
                )}<br><br>
                <p>${movie.fullplot}</p>
                <strong>Cast:</strong> ${
                    movie.cast.length > 0 ? movie.cast.join(", ") : "N/A"
                }<br><br>
                <strong>Awards:</strong> ${movie.awards.text}<br>
                <strong>IMDB Rating:</strong> ${movie.imdb.rating} (${
                        movie.imdb.votes
                    } votes)`;

                    let myModal = new bootstrap.Modal(
                        document.getElementById("detailsModal"),
                        {
                            backdrop: "static",
                            keyboard: false,
                            focus: true,
                        }
                    );

                    myModal.show();
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });
}

// generates <tr> elements and loads given movie data into them
function generateTableRows(data) {
    let rows = data.map((movie) => {
        return `<tr data-id=${movie._id} class='movieRow hover-shadow'>
                    <td>${movie.year}</td>
                    <td>${movie.title}</td>
                    <td>${movie.plot}</td>
                    <td>${movie.rated === undefined ? "N/A" : movie.rated}</td>
                    <td>${String(Math.floor(movie.runtime / 60)).padStart(
                        2,
                        "0"
                    )}:${String(movie.runtime % 60).padStart(2, "0")}</td>
                </tr>`;
    });
    return rows.join("");
}

window.addEventListener("DOMContentLoaded", (event) => {
    // load table
    loadMovieData();

    // click event for previous page button
    document.getElementById("previous-page").addEventListener("click", () => {
        if (page > 1) {
            page--;
            loadMovieData();
        }
    });

    // click event for next page button
    document.getElementById("next-page").addEventListener("click", () => {
        page++;
        loadMovieData();
    });

    // click event for submit button
    document.getElementById("searchForm").addEventListener("submit", (event) => {
        event.preventDefault();
        loadMovieData(document.getElementById("title").value);
    });

    // click event for clearForm button
    document.getElementById("clear").addEventListener("click", () => {
        document.getElementById("title").value = "";
        loadMovieData();
    });
});
