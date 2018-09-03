const { User } = require('../models')
const { cryptoPassword } = require('../tools/crypto.hmac')

async function register(req, res) {
    try {
        const password = cryptoPassword(req.body.password);
        console.log("password crypto :", password);
        const user = await User.create({ "email": req.body.email, "password": password });
        res.send(user.toJSON());
    } catch (err) {
        res.status(400).send({
            error: `This email account is already in use`
        })
    }
}

async function signIn(req, res) {
    try {
        const user = await User.findOne({ where: { "email": req.body.email } });
        const password = cryptoPassword(req.body.password);

        if (!user || user.password !== password) {
            res.status(400).send({
                error: `This email or password is not correct!`
            });
        }
        return res.send("Authenfication with success");
    } catch (err) {
        res.status(400).send({
            error: `This email account is already in use`
        })
    }
}


module.exports = { register, signIn }