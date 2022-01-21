const morgan = require('morgan')
const express = require('express');
const { nextTick } = require('process');
const app = express();

let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
  };
  
  let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
  };

  app.use(myLogger);
  app.use(requestTime);
  app.use(express.static('public'));
  app.use(morgan('common'));

let topMovies = [
    {
        title: 'The Rundown'
    },
    {
        title: 'Disturbia'
    },
    {
        title: 'Black Panther'
    },
    {
        title: 'Spider Man'
    },
    {
        title: 'The Sound of Music'
    },
    {
        title: 'Greece'   
    },
    {
        title: 'Paranormal Activity'
    },
    {
        title: 'The Conjuring'
    },
    {
        title: 'Tommy Boy'
    },
    {
        title: 'Black Sheep'
    }
]

app.get('/', (req, res) => {
    res.send('Welcome to my movie club!')
});

app.get('/movies', (req,res) => {
    res.json(topMovies)
});

app.get('/documentation.html', express.static('public') {

    res.sendFile('public/documentation.html', { root: __dirname })

});

app.get('/', function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
    next()
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });


