var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sqlite3 = require('sqlite3').verbose();
var app = express();
const { sequelize } = require('./models')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

/* ----------------------------------- SQLITE3------------------------------------*/
var db = new sqlite3.Database('data/db.sql', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQL database.');
});

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS entreprises (key INTEGER, name TEXT)");
    db.run("INSERT INTO entreprises (key, name) VALUES (?, ?)", "1", "Zsoft");
});

let entreprises = `SELECT DISTINCT Name name FROM entreprises
           ORDER BY name`;

db.all(entreprises, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row.name);
    });
});
/*
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
*/
app.get('/api/data', function (req, res) {
    console.log('Test 1');
    db.get("SELECT * FROM entreprises", function (err, row) {
        res.json(row);
    });
    console.log('Test 2');
});

app.post('/api/data', function (req, res) {
    console.log("received Data: " + req.body.json);
    db.run("INSERT INTO entreprises (key, name) VALUES (?,?)", function(err, row){
        if (err){
            console.err(err);
            res.status(500);
        }
        else {
            console.log(row)
            res.status(202);
        }
        res.end();
    });
});

/*---------------------------------------Sequelize--------------------------------*/
sequelize.sync()
    .then(() => {
        //app.listen(3000)
        console.log('Serveur started on port 3000');
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;