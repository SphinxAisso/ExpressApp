const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const { sequelize } = require('./models')

// Routes
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const entrepriseRouter = require('./routes/entreprise');
const employeeRouter = require('./routes/employee');

// Authenfication packages
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
}));
app.use(passport.initialize());
app.use(passport.session());
/*
 * 
  app.use(session({
    secret: 'sqdkaoizdbqmdzjdkqsa',
    resave: false,
    saveUnitialized: false,
    // cooke: {secure: true}
}));
*
*/
//Route
app.use('/', indexRouter);
app.use('/', registerRouter);
app.use('/', entrepriseRouter);
app.use('/', employeeRouter);

// Sequelize
sequelize.sync()
    .then(() => {
        app.listen(3000);
        console.log('Serveur started on port 3000');
    });

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
