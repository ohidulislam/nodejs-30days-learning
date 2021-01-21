const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Si-Fi'}
]

app.get('/', (req, res) => {
    res.send("Vidly is a movie database!")
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id ))

    if (!genre) return res.status(404).send("The item you're searching for is not found!")

    res.send(genre)
})

app.post('/api/genres/', (req, res) => {

    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genres)
})

app.put('/api/genres/:id', (req, res) => {
    // look for the genre
    // if not found return - 404 not found
    const genre = genres.find( g => g.id === parseInt(req.params.id ))
    if (!genre) return res.status(404).send("The item you're searching for is not found!")

    // validate inputs
    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    // update
    genre.name = req.body.name

    res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
    // look for the course
    const genre = genres.find( g => g.id === parseInt(req.params.id ))
    if (!genre) return res.status(404).send("The item you're searching for is not found!")
    
    // delete
    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    // return course
    res.send(genre)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema)
}