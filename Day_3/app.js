const Logger = require('./logger')
const logger = new Logger

// Register Listener
logger.on('logging', (args) => {
    console.log(args.data);
})


logger.log("message")