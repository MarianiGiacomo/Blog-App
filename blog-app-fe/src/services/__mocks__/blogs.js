const blogs = [
  {
    id: '5d3418e34321a71139456f84',
    author: 'author 1',
    title: 'title 1',
    important: false,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'user1',
      name: 'User Uno'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    author: 'author 2',
    title: 'title 2',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'user2',
      name: 'User Due'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    author: 'author 3',
    title: 'title 3',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'user3',
      name: 'User Tre'
    }
  },
]

let token = ''

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  token = 'token'
}

export default { getAll, setToken }