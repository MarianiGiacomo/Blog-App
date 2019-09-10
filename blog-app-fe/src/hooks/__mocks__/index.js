import { useState } from 'react'

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

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = () => {
  const [resources, setResources] = useState([])

  const setToken = () => 'token'

  const setInitial = initialArray => {
    setResources(initialArray)
  }

  const getAll = async () => {
    return Promise.resolve(blogs)
  }

  const service = {
    setToken,
    setInitial,
    getAll,
  }

  return [
    resources, service
  ]
}