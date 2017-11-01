//Express middleware call
var express = require('express')
var app = express()
//GET routes

app.listen(process.env.PORT||3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
//Index page route
app.get('/', function (req, res) {
  res.render('index', {msg: 'Community Service'});
})
//Contact page routes
app.get('/contact', function (req, res) {
  res.render('contact', {msg: 'Contact'});
})
// About page route
app.get('/about', function (req, res) {
  res.render('about', {msg: 'About'});
})
//Future log in page route
app.get('/login', function (req, res) {
  res.render('login', {msg: 'login'});
})
//Future signup page route
app.get('/signup', function (req, res) {
  res.render('signup', {msg: 'signup'});
})
//Terms and conditions
app.get('/terms', function (req, res) {
  res.render('terms', {msg: 'terms'});
})

//Initialization of handlebarsfor templating
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
