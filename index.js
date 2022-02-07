const mongoose = require('mongoose');
const Models = require('./models.js');
//connecting models.js file
const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const morgan = require('morgan')
const express = require('express');
const { nextTick } = require('process');
const app = express();
app.use(morgan('common'));
app.use(express.json() );
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
const uuid = require('uuid');
let auth = require('./auth')(app); //this ensures that express is available in your auth.js file
const passport = require('passport'); //require the Passport module and import the “passport.js” file
require('./passport'); //this line also requires the Passport module and imports the “passport.js” file

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Welcome to my movie club!')
});

app.get('/documentation.html', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname })
});

app.get('/', function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
    next()
});

// CREATE NEW USER
app.post('/users', (req, res) => {
    Users.findOne({Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday,
                    })
                    .then((user) => {res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
});

//CREATE NEW FAVORITE MOVIE FOR USER
app.post('/users/:Username/movies/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params._id }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });


//UPDATE USER INFO BY USERNAME
app.put('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, {$set:
        {
            Username:req.params.Username,
            Password: req.params.Password,
            Email: req.params.Email,
            Birthday: req.params.Birthday,
        }
    },
    { new: true },
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUSer);
        }
    });
});

//DELETE USERS FAVORITE MOVIE
app.delete('/users/:Username/movies/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $pull: { FavoriteMovies: req.params._id }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

//DELETE USER
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username})
        .then((user) => {
            if(!user) {
                res.status(400).send(req.params.Username + ' was not found' );
            } else {
                res.status(200).send(req.params.Username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//READ ALL USERS
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//READ A USER BY USERNAME
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// READ ALL MOVIES
app.get('/movies', passport.authenticate('jwt', { session: false }), (req,res) => {
      Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
  });

//   READ MOVIES BY TITLE
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req,res) => {
    Movies.findOne({Title: req.params.Title})
        .then((movieTitle) => {
            res.json(movieTitle)
        })
        .catch((err) => {
            console.error(err);
            res.status(201).send('Error: ' + err)
        });
});

// READ GENRES BY GENRE NAME
app.get('/movies/genre/:genreName/', passport.authenticate('jwt', { session: false }), (req,res) => {
    Movies.findOne({'Genre.Name': req.params.genreName})
        .then((movieGenre) => {
            res.json(movieGenre.Genre)
        })
        .catch((err) => {
            console.error(err);
            res.status(201).send('Error: ' + err)
        });
});

// READ DIRECTORS BY NAME
app.get('/movies/Directors/:Name/', passport.authenticate('jwt', { session: false }), (req,res) => {
    Movies.findOne({'Director.Name': req.params.Name})
        .then((movieDirector) => {
            res.json(movieDirector.Director)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err)
        });
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });


  app.get( '/api/users', (request, response) => {
    UserModel
    .getUsers()
    .then( result => {
    return response.json( result );
    })
})