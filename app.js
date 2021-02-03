const express = require('express');
//exrepss app
const app = express();

//register viewengine
app.set('view engine', 'ejs');
//add css
app.use(express.static(__dirname + '/public'));
//listen for requests
app.listen(3000);

app.get('/', (req, res) => {

    const blogs = [
        {title :'Igor is playing dota' , snippet: 'atus eveniet ratione temporibus aperiam harum alias officiis' },
        {title :'Igor is playing Pubg' , snippet: 'atus eveniet ratione temporibus aperiam harum alias officiis' },
        {title :'Igor is playing Warzone' , snippet: 'atus eveniet ratione temporibus aperiam harum alias officiis' }
    ];

    res.render('index', { title:'Home', blogs});
});

app.get('/about', (req, res) => {

    res.render('about', { title:'About' });
});

app.get('/blogs/create', (req , res) => {
    res.render('create',{ title:'Create a new blog' });
});

//404 page
app.use( (req, res) => {
    res.status(404).render('404', { title:'404' });

});