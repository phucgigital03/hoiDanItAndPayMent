const express = require('express')
const blogApiRouter = express.Router();

const blogController = require('../controllers/blogController.js');

blogApiRouter.get('/blog',blogController.allBlog)
blogApiRouter.post('/blog',blogController.createBlog)

module.exports = blogApiRouter
