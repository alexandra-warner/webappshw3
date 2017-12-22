// Import Express
const express = require('express');
// Instantiate Express
const app = express();

const mysql = require('mysql');
// Set up database connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Aw026674',
    database: 'movies'
});

// Regular Dependencies
const moment = require('moment');

// Middlewares
const logger = require('./middleware/logger.js');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
app.use(bodyParser.urlencoded({ extended: false })); // Parse form submissions
app.use(bodyParser.json()); // parse application/json
app.use(logger.log);
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// const blogData = require('./blog_data.json');

app.get('/rate', function (req, res) {
    const q = `SELECT movies.title, movies.movieId, movies.genres, AVG(ratings.rating) AS avgrating FROM Movies, ratings WHERE movies.movieId = ratings.movieId GROUP BY movies.title, movies.movieId, movies.genres ORDER BY RAND() LIMIT 10;`; // Fill in the blanks style escaping
    db.query(q, function (err, results) {
        const templateData={
            article: results
        }
        res.render('blog',templateData);
    });
});

//Update mysql database

app.post('/movie', function (req, res) {
    const movieId = req.body.movieid_submit;
    const timestamp   =   moment().format('X');
    const rating = req.body.rating_submit;
    const q = `INSERT INTO movies.ratings VALUES (?, ?, ?, ?)`
    db.query(q,[1000, movieId, rating, timestamp],function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed. Oops.');
        } else{
            console.log("Rating successfully submitted!");
            res.end('Rating successfully submitted!');
        }
    })
});

const listener = app.listen(5000, function () {
     console.log(`Your app is listening on port ${listener.address().port}`)
 })

