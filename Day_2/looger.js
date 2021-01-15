const url = 'https://logger.io/log'

console.log(__filename, 'file')
console.log(__dirname, 'directory')
const log = (message) => {
    // Send an HTTP request
    console.log(message);
}

// module.exports.log = log // exports as an object
module.exports = log // exports as a function