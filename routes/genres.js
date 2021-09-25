const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
];


router.get('/' , (req , res) =>  res.send(genres) );


router.get('/:id' , (req , res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre)
        return res.status(404).send('The genre with the given ID was not found.')
    res.send(genre);
})

router.post('/' , (req , res) => {
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


router.put('/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre)
        return res.status(404).send('The genre with the given ID was not found.')

    const { error } = validateGenres(req.body)

    if(error)
        return res.status(400).send(error.details[0].message)
    
    genre.name = req.body.name;
    res.send(genres)
})

router.delete('/:id' , (req , res) =>{
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

module.exports = router;