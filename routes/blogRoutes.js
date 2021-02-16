const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();
// blog routes
router.get('/blogs/create', (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
  });
  
  // all blogs home page
  router.get('/games', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('blogs/index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  //create a new blog with post and redirecit it to blogs
  router.post('/blogs', (req, res) => {
      const blog = new Blog(req.body);
      blog.save()
      .then((result) => {
          res.redirect('/games');
      })
      .catch((err) => {
          console.log(err);
      });
  })
  //single blog game
  router.get('/blogs/:id' , (req,res) => {
     const id = req.params.id; 
     Blog.findById(id)
      .then((result) => {
          res.render('blogs/details' , {blog: result, title:'Game Details'})
      })
      .catch((err) => {
          console.log(err);
      });
  
  })
  
  //delete a single blog on create page
  router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/games' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  module.exports = router;