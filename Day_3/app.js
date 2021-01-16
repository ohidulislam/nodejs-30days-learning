const EventEmitter = require('events')
const Emit = new EventEmitter

// Register Listener
Emit.on('logging', (args) => {
    console.log(args.data);
})

// Raise an event
Emit.emit('logging', {data: 'User logged in'})