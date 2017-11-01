//Express middleware call
var express = require('express')
var app = express()
//GET routes

app.listen(process.env.PORT||3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
//Index page
app.get('/', function (req, res) {
  res.render('index', {msg: 'Community Service'});
})
//
app.get('/contact', function (req, res) {
  res.render('contact', {msg: 'Contact'});
})
app.get('/about', function (req, res) {
  res.render('about', {msg: 'About'});
})

//Initialization of handlebarsfor templating
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
