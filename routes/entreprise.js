const express = require('express');
const entrepriseController = require('../controllers/entrepriseController');
const router = express.Router();
// const { authentificationMiddleware } = require('./index')

function authentificationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}

router.post('/api/entreprise',
    authentificationMiddleware(),
    entrepriseController.setEntreprise);

router.get('/api/entreprise', 
    authentificationMiddleware(),
    entrepriseController.getEntreprises);

router.route('/api/entreprise/:id')
    .get(
        authentificationMiddleware(),
        entrepriseController.getEntrepriseById)

    .put(
        authentificationMiddleware(),
        entrepriseController.updatEntreprise)

    .delete(
        authentificationMiddleware(),
        entrepriseController.deleteEntreprise)

module.exports = router;