const express = require('express');
const Game = require('../models/blog');
const Player = require('../models/player');


const router = express.Router();

  // all blogs home page

//how to use multiple collections on one  ejs
      router.get("/fortnite",function(req,res) {
            var player={}; //Create Empty player Object
            var blogs={}; //Create Empty games&blogs Object
            var vendors={};//Create Empty vendor Objext
            const activePlayer = {
                  "isactive": true 
                }

           
            Player.find(activePlayer).sort({ createdAt: -1 })
            .then(result => {
              players = result 
            })
            .catch(err => {
              console.log(err);
            }); 
    

            Game.find({},function(err,allVendors){
                if(err){
                    console.log(err);
                }else{
                    blogs=allVendors;
                    //find order collection and passing it to ejs templates
                    res.render("fortnite/index",{ players:players, blogs:blogs, title: 'Fortnite Tournament' });
                }
            });
        });
      

  
  module.exports = router;