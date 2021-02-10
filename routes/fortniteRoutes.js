const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();
// blog routes
router.get('/blogs/create', (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
  });
  
  // all blogs home page
  router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('blogs/index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  

  module.exports = router;