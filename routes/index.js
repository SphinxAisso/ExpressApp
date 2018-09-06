const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('index', { title: 'Express' });
});

function authentificationMiddleware() {
    return (req, res, next) => {
        console.log(`
            req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}

module.exports = router;
