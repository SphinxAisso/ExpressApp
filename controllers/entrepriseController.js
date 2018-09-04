const { Entreprise, User } = require('../models');

async function setEntreprise(req, res) {
    try {
        console.log("this is me :" + JSON.stringify (req.body));
        const entreprise = await Entreprise.create({ "name": req.body.name, "adresse": req.body.adresse});
        res.send(entreprise.toJSON());
    } catch (err) {
        res.status(400).send({
            error: `Error!`
        })
    }
}

async function getEntreprises(req, res) {
    if (req.User == null) {
        res.status(401).send({
            error: `You need to be authenticated.`
        });
    }

    try {
        const userId = req.User.id;
        const entreprises = await Entreprise.findAll({ where: { UserId: userId } });
        res.send(entreprises);
    } catch (err) {
        res.status(400).send({
            error: `Eerror during getting entreprises ` + err
        });
    }
}
/*
async function getEntrepriseById(req, res, next) {
    const entreprise = await Entreprise.findById(req.params.id);
    if (!entreprise) {
        return res.status(400).send({
            error: `Eerror during getting entreprise by id`
        });
    }
    res.send(entreprise);
}

async function updatEntreprise(req, res, next) {
    const entreprise = await Entreprise.findById(req.params.id);
    if (!entreprise) {
        return res.status(400).send({
            error: `Eerror during getting entreprise by id`
        });
    }
    entreprise.adresse = req.body.adresse;

    await entreprise.save();
    res.send(entreprise);
}

async function deleteEntreprise(req, res, next) {
    const entreprise = await Entreprise.findById(req.params.id);
    if (!entreprise) {
        return res.status(400).send({
            error: `Eerror during getting entreprise by id`
        });
    }
    await entreprise.destroy();
    console.log("Entreprise " + entreprise.name + " deleted with success ");
    res.send(entreprise);
}

*/
module.exports = { getEntreprises, setEntreprise };