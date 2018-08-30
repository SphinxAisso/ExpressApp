const AuthenticationController = require('../controllers/AuthenticationController');
const authenticationControllerPolicy = require('../policies/authenticationControllerPolicy')

module.exports = (app) => {
    app.post('/api/register',
        AuthenticationController.register)
}
