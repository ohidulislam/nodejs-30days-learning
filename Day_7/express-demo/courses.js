const express = require('express')
const router = express.Router()

const courses = [
    {id: 1, name: 'Course 1', price: '$9.92'},
    {id: 2, name: 'Course 2', price: '$3.35'},
    {id: 3, name: 'Course 3', price: '$6.80'}
]

router.get('/', (req, res) => {
    res.render({title: "helol", message: courses})
})
router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.get('/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id) )
    if(!course) return res.status(404).send("Sorry!! The page your are looking for is not found.")
    res.send(course)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}

express.modules = router