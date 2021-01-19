const express = require('express')
const app = express()

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

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id) )
    if(!course) res.status(404)
    res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})