const url = 'https://logger.io/log'

const log = (message) => {
    // Send an HTTP request
    console.log(message);
}

// module.exports.log = log // exports as an object
module.exports = log // exports as a function