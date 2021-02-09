const express = require('express');
const moment = require('moment');
const Player = require('../models/player');


const router = express.Router();

// player routes////////////////////////

  //render the create page
  router.get('/players/create', (req, res) => {
    res.render('players/create', { title: 'Create a player' });
  });
  

  // all players render
  router.get('/players', (req, res) => {
    //send moment js to index ejs
    res.locals.moment = moment;
    if(req.query.search){
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      Player.find({gamertag:regex}).sort({ createdAt: -1 })
      .then(result => {
        res.render('players/index', { players: result, title: 'All players' });
      })
      .catch(err => {
        console.log(err);
      }); 
    } else{
      Player.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('players/index', { players: result, title: 'All players' });
      })
      .catch(err => {
        console.log(err);
      }); 
    }
  });

  // all active players render
  router.get('/players/active', (req, res) => {
    //send moment js to index ejs
    res.locals.moment = moment;
    if(req.query.search){
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      Player.find({gamertag:regex}).sort({ createdAt: -1 })
      .then(result => {
        res.render('players/active', { players: result, title: 'Active players' });
      })
      .catch(err => {
        console.log(err);
      }); 
    } else{
      //declare an active player
      const activePlayer = {
        "isactive": true 
      }
      //show only active players
      Player.find(activePlayer).sort({ createdAt: -1 })
      .then(result => {
        res.render('players/active', { players: result, title: 'Active players' });
      })
      .catch(err => {
        console.log(err);
      }); 
    }
  });
  
  // fortnite
  router.get('/fortnite', (req, res) => {
    //send moment js to index ejs
    res.locals.moment = moment;
    if(req.query.search){
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      Player.find({gamertag:regex}).sort({ createdAt: -1 })
      .then(result => {
        res.render('players/fortnite', { players: result, title: ' Fortnite Tournament' });
      })
      .catch(err => {
        console.log(err);
      }); 
    } else{
      //declare an active player
      const activePlayer = {
        "isactive": true 
      }
      //show only active players
      Player.find(activePlayer).sort({ createdAt: -1 })
      .then(result => {
        res.render('players/active', { players: result, title: 'Fortnite Tournament' });
      })
      .catch(err => {
        console.log(err);
      }); 
    }
  });
  
  //create a new player with the form and redirect it to players
  router.post('/players', (req, res) => {
      const player = new Player(req.body);
      player.save()
      .then((result) => {
          res.redirect('/players');
      })
      .catch((err) => {
          console.log(err);
      });
  })
  //show single player details
  router.get('/players/:id' , (req,res) => {
      //send moment js to details ejs
      res.locals.moment = moment;
     const id = req.params.id; 
     Player.findById(id)
      .then((result) => {
          res.render('players/details' , {player: result, title:'Player Details'})
      })
      .catch((err) => {
          console.log(err);
      });
  
  });
  
  //render the single player update site site
  router.get('/updateplayer/:id' , (req,res) => {
  res.locals.moment = moment;
   const id = req.params.id; 
   Player.findById(id)
    .then((result) => {
        res.render('players/update' , {player: result, title:'Update Player'})
        
    })
    .catch((err) => {
        console.log(err);
    });
});

 //update player with the update post form and redirect to the players site
 router.post('/updateplayer/:id' , (req,res) => {

  const id = req.params.id; 
  const oldPlayer = req.params.body;
 

  Player.findByIdAndUpdate(req.params.id, {"name": req.body.name, "gamertag":req.body.gamertag, "age":req.body.age,"flag":req.body.flag,"checkout":req.body.checkout, "isactive":req.body.isactive, "fortnitescore":req.body.fortnitescore, "fifascore": req.body.fifascore,"ctrscore": req.body.ctrscore }, {new: true}, function(err, result){
    console.log(req.body.name);
    if(err) {
        console.log(err);
        res.redirect("/404");
    } else {
        console.log(result);
        res.redirect('/players')
    }
  });
});

 
  //delete a single blog on details or on click page
  router.delete('/players/:id', (req, res) => {
    const id = req.params.id;
    
    Player.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/players' });
      })
      .catch(err => {
        console.log(err);
      });
  });


  //fuzzy search function
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
  module.exports = router;