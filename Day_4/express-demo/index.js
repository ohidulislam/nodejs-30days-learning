const express = require('express')
const app = express()

// console.log(express());
// console.log(typeof app);

app.get('/', (req, res) => {
    res.send("hello world!!!!")
})
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4, 5])
})

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})