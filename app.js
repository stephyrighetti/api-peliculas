const express = require('express');
const cors = require('cors');
const app = express();
const Joi = require('joi');
const date = require('date-and-time');

const now  =  new Date();
const value = date.format(now,'MM/DD/YYYY HH:mm:ss');
    //console.log(value);


app.use(express.json());
app.use(cors())


const movies = [
    { id: 1, name: "The lost daughter", watched: false, createdAt: value},
    { id: 2, name: "The power of dog", watched: false, createdAt: value}, 
    { id: 3, name: "2046", watched: false, createdAt: value}, 
];

//GET METHOD

app.get('/api/movies', (req, res) => {
    res.send(movies);
})

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(c => c.id === parseInt(req.params.id));
  if(!movie) return res.status(404).send('The movie with the given ID was not found');
  res.send(movie);
});

//POST METHOD

app.post('/api/movies', (req, res) => {

    const peli = movies.find(c => c.name === req.body.name);
    if (peli) { return res.status(400).send('The movie already exists'); }

    const schema = Joi.object( {
        name: Joi.string().required()
    });

    const result = schema.validate(req.body);
    console.log(result);

    if (result.error) return res.status(400).send(result.error.details[0].message);


    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        watched: false,
        createdAt: req.body.value
    };

    movies.push(movie);
    res.send(movie);
    
    
})

//PUT METHOD

app.put('/api/movies/:id', (req,res) => {

    const movie = movies.find(c => c.id === parseInt(req.params.id))

    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found');
    }

    const schema = Joi.object({
<<<<<<< HEAD
        watched: Joi.boolean().required() 
    });

=======
        vista: Joi.boolean().required()
    })
>>>>>>> 56a9d4164731e4aba80832b15b01d54b5ecfd8ca
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    movie.watched = req.body.vista

<<<<<<< HEAD
    movie.watched = req.body.watched;
=======
>>>>>>> 56a9d4164731e4aba80832b15b01d54b5ecfd8ca
    res.send(movie);
})

//DELETE METHOD

app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('The movie with the given ID was not found');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movie);
})


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

//https://blog.logrocket.com/build-rest-api-node-express-mysql/ pag