process.env.DEBUG = 'app.startup'

const Joi = require('joi');
const debug = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');


const config = require('config');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const home = require('./routes/home');
const app = express();

app.use(express.json());
app.use('/api/genres' , home);
app.use('/' , genres);

//---template engine
app.set('view engine' , 'pug');
app.set('views' , './views')



//console.log(`NODE-ENV : ${process.env.NODE_ENV}`);
//console.log(`app : ${app.get('env')}`);


//console.log(`Application name : ${config.get('name')}`);
//console.log(`Mail Server : ${config.get('mail.host')}`);
//console.log(`Mail Server : ${config.get('mail.password')}`);



if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    //console.log('morgan enabled ...')
    debug('morgan enabled ...')
}

//db work ..
//debug('Connected to the database ...');








const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`Listening on port ${port}...`) )