const express = require('express');
//exrepss app
const app = express();

//register viewengine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {

  res.render('index');
});
app.get('/about', (req, res) => {

    res.render('about');
});

app.get('/blogs/create', (req , res) => {
    res.render()
});

//404 page
app.use( (req, res) => {
    res.status(404).render('404');

});