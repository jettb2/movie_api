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
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
const uuid = require('uuid');

app.use(express.static('public'));


// let users = [ 
// {
//     id: 1,
//     Name: "Cici",
//     favoriteMovies: []
// },
// {
//     id: 2,
//     Name: "Jett",
//     favoriteMovies: ["Black Panther"]
// }
// ];


// let movies = [
//     {
//         'Title': 'The Rundown',
//         'Genre': {
//             'Name': 'action'
//         },
//         'Directors': {
//             'Name': 'Peter Berg',
//             'Description': 'As a multi-faceted actor, writer and director, Peter Berg moved with ease from theater to film to television and back again. After making a name for himself primarily as an actor first and foremost, especially with his regular series role as Dr. Billy Kronk on the acclaimed drama, "Chicago Hope" (CBS, 1994-2000), Berg furthered his aspirations as a writer-director with the ill-received black comedy, "Very Bad Things" (1998). Undeterred by the awful critical reaction and poor box office totals of his first film, Berg continued to develop as an artist, eventually being hailed for his third feature, "Friday Night Lights" (2004). Not artistically satisfied, he developed the feature into a critically acclaimed series in 2006, earning numerous awards and nominations, firmly distancing himself from his disastrous directing debut. Though the series "Friday Night Lights" (NBC, 2006-08) failed to attract a large audience - at least in the eyes of the network - both fans and critics alike campaigned to keep the show on air, despite constant rumors whether or not it was on the verge of cancellation. For Berg, both the film and show established him as a gifted talent from which many more exceptional projects were expected.'
//         },
//     },
//     {
//         'Title': 'Disturbia',
//         'Genre': {
//             'Name': 'thriller'
//         },
//         'Directors': {
//             'Name': 'D.J Caruso',
//             // 'Description': 'With John Badham as a mentor and a degree in Television Production from Pepperdine University, D.J. Caruso went from directing television series to motion pictures that usually ended up being in the thriller genre. Daniel John Caruso got his first break out of school when Badham hired him as the second unit director for the 1993 action film "Point of No Return" after losing his original second unit director. Television became Caruso''s entryway into regular directing work starting with the short-lived 1995 Fox sci-fi series, "VR.5." After padding his experience overseeing single episodes of "Martial Law," "Dark Angel," and "Smallville," the Connecticut native made his directorial feature film debut with the 2002 neo-noir motion picture, "The Salton Sea." Caruso followed this critically admired but commercially stilted effort with the 2004 Angelina Jolie psychological thriller, "Taking Lives." Only moderately successful at the box office, it nonetheless allowed the former television director to land more film projects. Aside from signing on to direct a handful of episodes of the gritty FX crime drama "The Shield," Caruso spent the remainder of the decade working as a movie director. His big break during that time came when Steven Spielberg hired him to direct the 2007 Shia LaBeouf thriller, "Disturbia," which grossed over $117 million and became Caruso''s biggest hit. He reunited with LaBeouf on the action thriller "Eagle Eye" the following year.'
//         },
//     },
//     {
//         'Title': 'Black Panther',
//         'Genre': {
//             'Name':'action'
//         },
//         'Directors': {
//             'Name': 'Ryan Coogler',
//             // 'Description': 'Ryan Coogler was an American director who found success early in his career with short films and his lauded feature-length film debut "Fruitvale Station" (2013) before going on to become one of the most commercially successful black filmmakers in history. Ryan Coogler was born on May 23, 1986 in Oakland, California. His mother was a community organizer, and his father was a probation officer. Coogler was an athletic child, and he attended Saint Mary''s College of California on a football scholarship. There, he studied chemistry, though a professor encouraged him to look into screenwriting. Coogler transferred, eventually landing at the USC School Of Cinematic Arts. There, he began directing award-winning short films, which centered on true-to-life and often harrowing tales. Starting at age 21, Coogler worked with at-risk youth, following in his father''s footsteps by working in the prison system. His next cinematic venture was "Fruitvale," a feature-length film about the last 24 hours of Oscar Grant''s life before he was shot by policemen in Coogler''s hometown of Oakland in a manslaughter case that had gone mostly overlooked by the public. The film, renamed "Fruitvale Station," starred Michael B. Jordan, Melonie Diaz, and Octavia Spencer, and Forest Whitaker was one of the producers. After winning much praise and many awards at Sundance and Cannes, it was released by The Weinstein Company to popular and critical success. In 2014, Coogler signed on to direct "Creed," a "Rocky" spin-off also starring Michael B. Jordan. Its critical and commercial success led to the biggest film of Coogler''s career so far, "Black Panther" (2018). The first film within the Marvel Cinematic Universe to focus on a black lead character with a majority-black cast, the film was not only a massive commercial success, it was hailed as a major move forward for African-American filmmakers in general.'
//         },
//     },
//     {
//         'Title': 'Spider Man',
//         'Genre': {
//             'Name':'action'
//         },
//         'Directors': {
//             'Name': 'Sam Raimi',
//             // 'Description': 'Born in a suburb of Detroit, Michigan in 1959, Sam Raimi began making movies with Bruce Campbell and some other friends when they were in their teens. The two would continue to collaborate repeatedly over the span of their careers. Raimi attended Michigan State University, but dropped out to make "The Evil Dead" (1981), starring Campbell. The film proved to be the beginning of a partnership with Robert Tapert (a roommate of Raimi''s older brother) as a producer. Featuring Raimi''s trademark kinetic camerawork, "The Evil Dead" would become a cult phenomenon and spawn a series of films as well as a reboot and a TV series. In 1994 Raimi created his first TV series. "M.A.N.T.I.S." (Fox, 1994-95), about a paralyzed doctor who becomes a superhero when assisted by a powered exoskeleton, was envisioned as a filmed comic book, but didn''t make an impression with audiences and was cancelled after one season. The next year he created the hit show "Xena: Warrior Princess" (Syndication, 1995-2001). Raimi also continued to direct a variety of studio films including the critically acclaimed "A Simple Plan" (1998) and baseball film "For Love of the Game" (1999). He returned to fully embrace his inner comic book geek when he directed the blockbuster "Spider-Man" (2002), which became the first film to gross over $100 million in a single weekend. Raimi directed the next two films of his "Spider-Man" trilogy, then returned to the horror genre with "Drag Me to Hell" (2009). Although a prolific producer of television, Raimi didn''t direct any until 2014, when he helmed the pilot for "Rake" (Fox, 2014) starring Greg Kinnear. In 2015, he directed the pilot for "Ash vs. Evil Dead" (Starz, 2015-18), Executive Producing with Robert Tapert, and starring Bruce Campbell.'
//         },
//     },
//     {
//         'Title': 'The Sound of Music',
//         'Genre': {
//             'Name':'musical'
//         },
//         'Directors': {
//             'Name': 'Robert Wise',
//             // 'Description': 'Veteran Hollywood director Robert Wise was credited with helming 39 feature films from 1944 to 1989, establishing an admirable reputation in such a wide variety of genres as to prompt some critics to unfairly posit that there was no "Wise style." At the beginning of his career, he worked with equal facility in horror ("The Curse of the Cat People") (1944), film noir ("Born to Kill") (1947), Westerns ("Blood on the Moon") (1948), sports ("The Set-Up") (1949) and sci-fi ("The Day the Earth Stood Still") (1951), demonstrating a visual and narrative dexterity that other filmmakers could only marvel at. After earning his stripes in the 1950s, Wise went on to become one of the most successful and revered directors of the following decade, winning four Oscars for his work on the musical extravaganzas "West Side Story" (1961) and "The Sound of Music" (1965). As film budgets - and studio expectations - skyrocketed, more personal projects, such as the uncompromising Steve McQueen war drama "The Sand Pebbles" (1966), became increasingly difficult for Wise to mount. And although one of his final directorial efforts, the big-budget spectacular "Star Trek: The Motion Picture" (1979), may not have been greeted with the unqualified praise the studio had hoped for, it nonetheless demonstrated the work of a master craftsman, still in full possession of his artistic powers. When responding to the charges of some that Wise never left a personal, artistic imprint on his films, the director replied that it was not the director''s job to tailor the film to themselves, but rather, to tailor themselves to the film.'
//         },
//     },
//     {
//         'Title': 'Grease'   ,
//         'Genre': {
//             'Name':'musical'
//         },
//         'Directors': {
//             'Name': 'Randal Kleiser',
//             'Description': 'Former TV director ("Marcus Welby, M.D.," "Starsky & Hutch") Randal Kleiser struck lucky at the box-office with his first feature, "Grease" (1978),and then directed another teen-friendly yet mainstream film, "The Blue Lagoon" (1980).'
//         },
//     },
//     {
//         'Title': 'Paranormal Activity',
//         'Genre': {
//             'Name':'horror'
//         },
//         'Directors': {
//             'Name': 'Oren Peli',
//             // 'Description': 'Director Oren Peli took his own fear of the unknown, shot it with a night-vision camera, and scared to death all those who dared to experience it. Peli brought moviegoers face-to-face with evil with the horror flick "Paranormal Activity" (2009), the story of a couple terrorized by a strange presence in their suburban home. With a cast of unknown actors, an $11,000 budget, and no prior filmmaking experience, Peli created a shoe-string budget masterpiece that struck abject terror into the hearts of those who saw the film, including that of director Steven Spielberg, whose company DreamWorks produced the film. Peli''s directorial debut earned just shy of $100 million less than a month after its wide release in the U.S., and scared up comparisons to another indie film, "The Blair Witch Project" (1999), which also had the same slow burn effect by exploiting the visceral fear of the unknown via a camcorder. With "Paranormal Activity," Peli succeeded not only in leaving in his wake thousands of sleepless fans, but also proving that imagination - not special effects - was a more powerful force in creating a great horror movie.'
//         },
//     },
//     {
//         'Title': 'The Conjuring',
//         'Genre': {
//             'Name':'horror'
//         },
//         'Directors': {
//             'Name': 'James Wan',
//             // 'Description': 'In 2004, a low-budget film made by two unknown Australians hit the theaters and launched a cultural zeitgeist in horror cinema. But director James Wan insists that he and writer Leigh Whannell never intended to create a new "torture porn" genre of horror with their debut "Saw" (2004) and its villain Jigsaw, represented iconically onscreen by a disturbing puppet named Billy. A look at Wan''s body of work supports his assertion; while he went on to produce the increasingly violent sequels in the "Saw" franchise, he did not direct them; and his subsequent contributions to the horror genre, such as "Insidious" (2010) and "The Conjuring" (2013), are in a much more traditional and low-key vein dealing with familiar tropes like evil dolls, haunted houses, possession and witchcraft.'
//         },
//     },
//     {
//         'Title': 'Tommy Boy',
//         'Genre': {
//             'Name':'comedy'
//         },
//         'Directors': {
//             'Name': 'Peter Segal',
//             // 'Description': 'Comedy director Peter Segal makes the sort of films that rarely get good reviews, but are appreciated by their target audience of post-adolescent males. Segal''s earliest credit was for directing a 1991 cable comedy special for Tom Arnold, then at the height of his tabloid infamy for his tempestuous marriage to fellow comedian Roseanne Barr; Segal also directed two episodes of Arnold''s short-lived sitcom "The Jackie Thomas Show." Segal''s first big-screen credit was "Naked Gun 33 and 1/3: The Final Insult," the last and most poorly received of the three films based on the cult ''80s slapstick TV series "Police Squad!" His next film, '95's "Tommy Boy," starred former "Saturday Night Live" players Chris Farley and David Spade as an odd couple battling corporate con artists; despite mixed-at-best reviews, the film was enormously profitable and launched Segal''s career as a purveyor of unapologetically low-brow humor. After helming Eddie Murphy''s critically savaged big-budget sequel "Nutty Professor II: The Klumps," Segal made a string of three films with Adam Sandler that helped the actor grow out of his initial man-child persona without losing his core fanbase. The romantic comedy "50 First Dates," in which Sandler romances an amnesia sufferer played by Drew Barrymore, was the most commercially successful, and even picked up some grudgingly positive reviews. A 2008 adaptation of the ''60s spy comedy "Get Smart" starring Steve Carell and Anne Hathaway as Maxwell Smart and Agent 99, respectively, was even more commercially successful, though reviews were again decidedly mixed.'
//         },
//     },
//     {
//         'Title': 'Black Sheep',
//         'Genre': {
//             'Name':'comedy'
//         },
//         'Directors': {
//             'Name': 'Penelope Shpeeris',
//             // 'Description': 'As a notable filmmaker during the 1980s independent movement, director Penelope Spheeris found substantial mainstream success in the 1990s helming a number of high-profile features and television projects. After establishing her bona fides with the cult favorite documentary, "The Decline of Western Civilization" (1981) and its sequel "The Decline of Western Civilization Part II, The Metal Years" (1988), Spheeris made the jump to features with appreciated efforts like "Suburbia" (1983) and "The Boys Next Door" (1985). But it was directing the surprise hit comedy "Wayne''s World" (1992) that propelled Spheeris into the realm of commercially successful director. Seeking to cement her commercial status, she directed feature remakes of "The Beverly Hillbillies" (1993), "The Little Rascals" (1994) and "Black Sheep" (1996). She next returned to her roots with "The Decline of Western Civilization Part III" (1998). Spheeris remained a potent filmmaker no matter what the material.'
//         },
//     }
// ]

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

// OLD CREATE NEW USER CODE
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     console.log(newUser);

//     if (newUser.name) {
//         newUser.id = uuid.v4();
//         users.push(newUser);
//         res.status(201).json(newUser)
//     } else {
//         res.status(400).send('Users need names')
//     }
// });

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

//UPDATE USER INFO BY USERNAME


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

//READ ALL USERS
app.get('/users', (req, res) => {
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
app.get('/users/:Username', (req, res) => {
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
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

// READ MOVIES BY TITLE
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie')
    }
})


// READ GENRES BY GENRE NAME
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('No such genre')
    }
});

// READ DIRECTORS BY DIRECTOR NAME
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


  app.get( '/api/users', (request, response) => {
    UserModel
    .getUsers()
    .then( result => {
    return response.json( result );
    })
})