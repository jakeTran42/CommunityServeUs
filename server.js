// .env rewuirement Hi Donny
require('dotenv').config();
//module imports and node
const express = require('express')
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
//bodyparser
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// self defined variables and requirements
const Post = require('./models/post.js');
var Comment = require('./models/comment.js');
//Custom css and JQuery
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


// sets mongoose promise to built in JS promise
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost/CommunityServesUs', { useMongoClient: true });

app.use(cookieParser())


//middle wear for authori
var checkAuth = (req, res, next) => {
  console.log("*** Checking authentication");

  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jsonwebtoken.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}

app.use(checkAuth)

// Handlebars code for middle where
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Routes for navigation MOVE ALL TO THE CONTROLLERS
//subreddit routes
require('./controllers/comments.js')(app);
require('./controllers/posts.js')(app);
require('./controllers/authen')(app)
require('./controllers/posts')(app)
require('./controllers/comments')(app)

app.listen(process.env.PORT||3000, ()=> {
  console.log('Server for CommunityServesUs listening on port 3000!')
})
