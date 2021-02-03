const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Game = require('./models/game');
const { result } = require('lodash');
//exrepss app
const app = express();


//database mongo db atlas connect 
const dbURI = 'mongodb+srv://gameroom:Playforfun2@cluster0.gp25g.mongodb.net/games?retryWrites=true&w=majority';
//conect to moongose atlas and listen on localhost 3000
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

//register viewengine
app.set('view engine', 'ejs');

//add css middlware and static styles
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/add-blog', (req ,res) => {
    const game = new Game({
        title: 'Warzone',
        snippet: 'A cool game for kids'
    }) 

    //save it to the database async
    game.save()
    .then( (result) => {
        res.send(result)
    })
    .catch( (err)=>{
        console.log(err)
    } )
});




app.get('/', (req, res) => {

    res.redirect('./games');
});

app.get('/about', (req, res) => {

    res.render('about', { title:'About' });
});
app.get('/games', (req, res) => {
    Game.find()
    .then((result) => {
    console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })
    res.render('index', { title:'All Games' , games: result });
});

//game routes



app.get('/blogs/create', (req , res) => {
    res.render('create',{ title:'Create a new blog' });
});

//404 page
app.use( (req, res) => {
    res.status(404).render('404', { title:'404' });

});