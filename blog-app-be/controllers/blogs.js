const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    console.log(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  let user = {};
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    user = await User.findById(decodedToken.id);
  } catch (error) {
    next(error);
    console.log(error);
    return response.status(401).json({ error: error });
  }

  const blog = new Blog({ ...body, 'user': user.id });

  if (!blog.title | !blog.url) {
    response.status(400).end();
  } else {
    blog.likes? true : blog.likes = 0;
    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      try {
        await user.save();
      } catch (error) {
        console.log('Cant save user', error);
        response.status(403).end(error.message);
      }
      response.status(201).json(savedBlog);
    } catch (error) {
      response.status(403).end(error.message);
      console.log(error);
    }
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  let user = {};
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    user = await User.findById(decodedToken.id);
  } catch (error) {
    next(error);
    console.log(error);
  }

  let blog = {};
  try {
    blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === user.id.toString()) {
      blog.delete();
      response.status(204).end();
    } else {
      response.status(403).end();
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  try {
    let blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
    blog.title = body.title;
    blog.author = body.author;
    blog.likes = body.likes;
    blog.url = body.url;
    const updateBlog = await blog.save();
    response.json(updateBlog.toJSON());
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = blogsRouter;
