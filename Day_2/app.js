// Working with build-in node `path` module
const path = require('path')

const pathObj = path.parse(__filename)

console.log(pathObj);