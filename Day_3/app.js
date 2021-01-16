const EventEmitter = require('events')
const Emit = new EventEmitter


// Register a Listener
Emit.on('messageLogged', function() {
    console.log('Listened to an event');
})

// Raise an event
Emit.emit('messageLogged')

// console.log(Emit);