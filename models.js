const mongoose = require('mongoose') 

let movieSchema = mongoose.Schema({
    Title: {type: String, requires: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Bio: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;



// const UserModel = {
//     createUser : function( newUser ){
//         return User.create( newUser );
//     },
//     getUsers : function(){
//         return User.find();
//     },
//     getUserById : function( userName ){
//         return User.findOne({ userName });
//     },
//     updateUserComment : function( id, newComment ){
//             return CommentModel.addComment( newComment )
//         .then( result => {
//             return User.findByIdAndUpdate({_id: id}, {$push: {comments: result}});
//         });
//     }
// };

// module.exports.userModel = userModel;