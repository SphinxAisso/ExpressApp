const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log(req.session.passport);
    console.log(req.isAuthenticated());
    res.render('index', { title: 'Express' });
});

module.exports = router;
