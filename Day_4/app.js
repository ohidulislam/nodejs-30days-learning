const http = require('http')

const server = http.createServer( (req, res) => {
    if(req.url === '/') {
        res.write('Hello World!')
        res.end()
    }

    if(req.url === '/courses') {
        res.write(JSON.stringify([1, 2, 3, 4]))
        res.end()
    }
})


// We wouldn't do this in real life, cause this is very low level
// server.on('connection', (socket) => {
//     console.log("New connection...");
// })

server.listen(3000)

console.log("Listening on port 3000");