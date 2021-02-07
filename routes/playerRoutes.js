const express = require('express');
const moment = require('moment');
const Player = require('../models/player');

const router = express.Router();
// blog routes
router.get('/players/create', (req, res) => {
    res.render('players/create', { title: 'Create a player' });
  });
  
  // all blogs home page
  router.get('/players', (req, res) => {
    //send moment js to index ejs
    res.locals.moment = moment;
    if(req.query.search){
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      Player.find({name:regex}).sort({ createdAt: -1 })
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
  
  //create a new blog with post and redirecit it to players
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
  //single blog game
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
  
  //update single player form site
  router.get('/updateplayer/:id' , (req,res) => {

   const id = req.params.id; 
   Player.findById(id)
    .then((result) => {
        res.render('players/update' , {player: result, title:'Player Details'})
    })
    .catch((err) => {
        console.log(err);
    });

});


  
  //delete a single blog on create page
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