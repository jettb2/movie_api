const morgan = require('morgan')
const express = require('express');
const { nextTick } = require('process');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json() );

let users = [ 
{
    id: 1,
    Name: "Cici",
    favoriteMovies: []
},
{
    id: 2,
    Name: "Jett",
    favoriteMovies: ["Black Panther"]
}
];


let movies = [
    {
        'Title': 'The Rundown',
        'Genre': {
            'Name': 'action'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'Disturbia',
        'Genre': {
            'Name': 'thriller'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'Black Panther',
        'Genre': {
            'Name':'action'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'Spider Man',
        'Genre': {
            'Name':'action'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'The Sound of Music',
        'Genre': {
            'Name':'musical'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'Greece'   ,
        'Genre': {
            'Name':'musical'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'Paranormal Activity',
        'Genre': {
            'Name':'horror'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'The Conjuring',
        'Genre': {
            'Name':'horror'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'Tommy Boy',
        'Genre': {
            'Name':'comedy'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    },
    {
        'Title': 'Black Sheep',
        'Genre': {
            'Name':'comedy'
        },
        'Directors': {
            'Name': 'Jett',
            'Description': 'The greatest director of all time'
        },
    }
]

app.get('/', (req, res) => {
    res.send('Welcome to my movie club!')
});

app.get('/movies', (req,res) => {
    res.json(movies)
});

app.get('/documentation.html', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname })
});

app.get('/', function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
    next()
});

// CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser);

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('Users need names')
    }
});

// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;

    let user = users.find(user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('Error')
    }
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id );

    if (user) {
        user.Name = updatedUser.Name;
        res.status(200).json(user);
    } else {
        res.status(400).send('No user found');
    }
});

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;

    let user = users.find(user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle );
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('Error')
    }
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    let user = users.find(user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id );
        res.status(200).send(`user ${id} has been removed`);
    } else {
        res.status(400).send('Error')
    }
});

// READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

// READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie')
    }
})


// READ
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('No such genre')
    }
});

// READ
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('No such director')
    }
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });


