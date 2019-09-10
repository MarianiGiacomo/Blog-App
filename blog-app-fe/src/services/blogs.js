import axios from 'axios'
const baseUrl = `${BACKEND_URL}/api/blogs`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (token, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (token, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const createComment = async (token, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogId = newObject.blog
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, newObject, config)
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  getComments,
  createComment,
}