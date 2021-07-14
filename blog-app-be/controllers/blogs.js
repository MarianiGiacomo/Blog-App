const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
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

  const blog = new Blog({ ...body, comments: [], 'user': user.id });

  if(!blog.title | !blog.url) {
    response.status(400).end('Title and URL must be given');
  } else if(blog.url.substring(0,7) !== 'http://' && blog.url.substring(0,8) !== 'https://'){
    response.status(400).end('Wrong URL format');
  } else {
    blog.likes? true : blog.likes = 0;
    try {
      const savedBlog = await Blog.findOne(await blog.save()).populate('user', { username: 1, name: 1 });
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
    user.blogs = user.blogs.forEach(b => {
      if(b.id !== blog.id){
        return b;
      }
    });
    if(blog.user.toString() === user.id.toString()) {
      blog.delete();
      user.save();
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

blogsRouter.get('/:id/comments', async (request, response, next) => {
  try {
    let blog = await Blog.findById(request.params.id)
      .populate({ path: 'comments', populate: { path: 'user', select: 'name' } });
    response.json(blog.comments);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body;
	let decodedToken = {}
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
  } catch (error) {
    next(error);
    console.log(error);
    return response.status(401).json({ error: error });
  }
	const user = await User.findById(decodedToken.id);
  const comment = new Comment({ ...body, 'user': user.id });
  if(!comment.comment | !comment.blog){
    response.status(400).end();
  }
	try {
		const blog = await Blog.findById(body.blog);
		const savedComment = await comment.save();
		blog.comments = blog.comments.concat(savedComment.id);
		await blog.save();
		response.status(201).json(savedComment);
	} catch (error) {
		console.log('Cant save comment', error);
		response.status(403).end(error.message);
	}
});

module.exports = blogsRouter;
