const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => { 
  try {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
    response.json(users.map(u => u.toJSON()));
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    if(!body.name) {
      response.statusMessage = 'Name can not be empty';
      response.status(400).end();
    } else if(!body.username) {
      response.status(400).end('Username can not be empty');
    } else if(!body.password | body.password.length < 3) {
      response.status(400).end('Password minimum length = 3');
    }
    else {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(body.password, saltRounds);

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      });

      const savedUser = await user.save();

      response.json(savedUser);
    }
  } catch (error) {
    response.status(403).end(error.message);
  }
});

module.exports = usersRouter;
