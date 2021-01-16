const EventEmitter = require('events')
// const emitter = new EventEmitter

const url = 'https://'

class Logger extends EventEmitter {
    log (msg) {
        console.log(msg);
    
        // Raise an event
        this.emit('logging', {data: 'User logged in'})
    }
}

module.exports = Logger