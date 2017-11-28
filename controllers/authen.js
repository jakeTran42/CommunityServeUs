var jwt = require('jsonwebtoken');
var User = require('../models/User');
var mongoose = require('mongoose');
module.exports = (app) => {
      // CREATE

// Route for entering the user infromation for the sign up
    app.get('/signup', (req, res, next) => {
      var currentUser = req.user;
      res.render('signup', {currentUser: currentUser});
    })

    // LOGIN FORM
app.get('/login', (req, res, next)=> {
  res.render('login');
});
    //Route to login to the site
    // LOGIN
    app.post('/login', (req, res, next)=> {
    const username = req.body.username;
    const password = req.body.password;
    // Find this user name
    User.findOne({ username }, 'username password').then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password"});
        }
        // Create a token
        const token = jwt.sign(
          { _id: user._id, username: user.username }, process.env.SECRET,
          { expiresIn: "60 days" }
        );
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      });
    }).catch((err) => {
      console.log(err);
    });
  });

// SIGN UP POST- handles the user authentication and JWTs
app.post('/signup', (req, res) => {
// Create User and JWT
    const user = new User(req.body);

    user.save().then((user) => {
      var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
      console.log(user._id);
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
    });

}
