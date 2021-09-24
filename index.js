process.env.DEBUG = 'app.startup'

const Joi = require('joi');
const debug = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');


const config = require('config');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());

//console.log(`NODE-ENV : ${process.env.NODE_ENV}`);
//console.log(`app : ${app.get('env')}`);

console.log(`Application name : ${config.get('name')}`);
console.log(`Mail Server : ${config.get('mail.host')}`);
//console.log(`Mail Server : ${config.get('mail.password')}`);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    //console.log('morgan enabled ...')
    debug('morgan enabled ...')
}

//db work ..
debug('Connected to the database ...');

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
];


app.get('/api/genres' , (req , res) =>  res.send(genres) );


app.get('/api/genres/:id' , (req , res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre)
        return res.status(404).send('The genre with the given ID was not found.')
    res.send(genre);
})

app.post('/api/genres' , (req , res) => {
    const {error} = validateGenres(req.body);
    if(error)
        return res.status(400).send(error.details[0].message)

    const genre = {
        id : genres.length + 1 ,
        name : req.body.name
    };

    genres.push(genre);
    res.send(genres);
})


app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre)
        return res.status(404).send('The genre with the given ID was not found.')

    const { error } = validateGenres(req.body)

    if(error)
        return res.status(400).send(error.details[0].message)
    
    genre.name = req.body.name;
    res.send(genres)
})

app.delete('/api/genres/:id' , (req , res) =>{
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre)
        return res.status(404).send('The genre with the given ID was not found.')

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    
    res.send(genres);
});

function validateGenres(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(genre);
}



const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`Listening on port ${port}...`) )