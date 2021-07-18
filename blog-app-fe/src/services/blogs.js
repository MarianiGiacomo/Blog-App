import { postReq, putReq, deleteReq, responseOrThrow } from './fetch'

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.BACKEND_URL}/api/blogs`

const getAll = async () => {
  const response = await fetch(baseUrl)
  return await responseOrThrow(response)
}

const create = async (token, newObject) => {
	const request = postReq(baseUrl, newObject, token)
	const response = await fetch(request)
	return await responseOrThrow(response)
}

const update = async (id, newObject) => {
	const request = putReq(`${baseUrl}/${id}`, newObject) 
	const response = await fetch(request)
	return await responseOrThrow(response)
}

const remove = async (token, id) => {
	const request = deleteReq(`${baseUrl}/${id}`, token)
	const response = await fetch(request)
	return await responseOrThrow(response)
}

const getComments = async (id) => {
  // const response = await axios.get(`${baseUrl}/${id}/comments`)
  // return response.data 
  const response = await fetch(`${baseUrl}/${id}/comments`)
  return await responseOrThrow(response)
}

const createComment = async (token, newObject) => {
  const blogId = newObject.blog
	const request = postReq(`${baseUrl}/${blogId}/comments`, newObject, token)
	const response = await fetch(request)
	return await responseOrThrow(response)
}

export default {
  getAll,
  create,
  update,
  remove,
  getComments,
  createComment,
}