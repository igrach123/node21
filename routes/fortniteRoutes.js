const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

  // all blogs home page
  router.get('/fortnite', (req, res) => {
   
        res.render('fortnite/index')
      
      
  });
  
  module.exports = router;