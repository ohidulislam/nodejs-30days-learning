const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'Course 1', price: '$9.92'},
    {id: 2, name: 'Course 2', price: '$3.35'},
    {id: 3, name: 'Course 3', price: '$6.80'}
]

app.get('/', (req, res) => {
    res.send("hello world!!!!")
})
app.get('/api/courses', (req, res) => {
    res.send(courses)
})
app.post('/api/courses', (req, res) => {
    const randPrice = (Math.random() * 10 + 1).toFixed(2)
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        price: `$${randPrice}`
    }
    courses.push(course)
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id) )
    if(!course) res.status(404).send("Sorry!! The page your are looking for is not found.")
    res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})