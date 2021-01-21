function log(req, res, next) {
    console.log("Logging...")
    next()
}

function authenticator(req, res, next) {
    console.log("Authenticating...")
    next()
}

module.exports.logger = log
module.exports.auth = authenticator