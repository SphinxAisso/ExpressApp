const crypto = require('crypto');

function cryptoPassword(password) {
    const hmac = crypto.createHmac('sha256', 'F5B38CCD9DC77221F08EABF46BE84CB3B72B2753EDA52AE2916F8E9B00B11162');
    hmac.update(password);
    return hmac.digest('hex')
}

module.exports = { cryptoPassword }