const express = require('express');
const entrepriseController = require('../controllers/entrepriseController');
const router = express.Router();

router.post('/api/entreprise',
    entrepriseController.setEntreprise);

router.get('/api/entreprises',
    entrepriseController.getEntreprises);
/*
router.route('/api/entreprise/:id')
    .get(
        entrepriseController.getEntrepriseById)

    .put(
        entrepriseController.updatEntreprise)

    .delete(
        entrepriseController.deleteEntreprise)
*/
module.exports = router;