const startDebugger = require('debug')('app:startDebugger')
const dbDebugger = require('debug')('app:dbDebugger')

const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const express = require('express')
const { logger, auth } = require('./middleware')
const app = express()


// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
// console.log(`app : ${app.get('env')}`);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

// Custom Middleware
app.use(logger)
app.use(auth)

if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startDebugger("Morgan enabled...")
}

// Database Debugger 
dbDebugger("Connecting to the database...")

// 
// console.log(`App password: ${process.env.APP_PASSWORD}`);

console.log(`App name: ${config.get('name')}`);
console.log(`Email server: ${config.get('mail')}`);
console.log(`App password: ${config.get('mail.password')}`);



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

    const { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // if(!req.body.name || req.body.name.length < 3) {
    //     // 400 bad request 
    //     res.status(400).send("Name is required or should not be less than 3 character")
    //     return
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        price: `$${randPrice}`
    }
    courses.push(course)
    res.send(courses)
})

app.put('/api/courses/:id', (req, res) => {
    // Lookup for the course
    // if not, set 404 not found
    const course = courses.find( c => c.id === parseInt(req.params.id) )
    if(!course) return res.status(404).send("Sorry!! The page you're looking for is not found.")

    // validate course
    // if not set 400 - bad request
    const { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // update course
    // Return the updated course
    course.name = req.body.name
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    // Find the course
    // if not exits 404 - not found
    const course = courses.find( c => c.id === parseInt(req.params.id) )
    if(!course) return res.status(404).send("Sorry!! Item doesn't exits.")

    // delete the course
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    
    // return course
    res.send(course)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id) )
    if(!course) return res.status(404).send("Sorry!! The page your are looking for is not found.")
    res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}