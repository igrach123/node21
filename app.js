//import npm modules
const express = require('express');
const morgan = require('morgan');
const moment = require('moment');
const mongoose = require('mongoose');

//import routes
const blogRoutes = require('./routes/blogRoutes');
const playerRoutes = require('./routes/playerRoutes');
const fortniteRoutes = require('./routes/fortniteRoutes');

//fire the express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://gameroom:Playforfun2@cluster0.gp25g.mongodb.net/games?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); //passes the post data to an url object with is withing the req

/* app.use(morgan('dev')); put out data */ 
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//homepage redirect
app.get('/', (req, res) => {
  res.redirect('/players/active');
});


// importin routes from routes/blogRoutes
/* app.use(scoreRoutes); */
app.use(blogRoutes);
app.use(playerRoutes);
app.use(fortniteRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});