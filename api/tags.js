const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
  
    next();
  });
  
  tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const tagName =req.params;
    try {
       
            const allPosts = await getPostsByTagName(tagName);
        
            const posts = allPosts.filter(post => {
              if (post.active) {
                return true;
              }
        
              if (req.user && req.user.id === post.author.id) {
                return true;
              }
        
              return false;
            })

      res.send({posts});
      // send out an object to the client { posts: // the posts }
    } catch ({ name, message }) {
      // forward the name and message to the error handler
    }
  });
  
  module.exports = tagsRouter;