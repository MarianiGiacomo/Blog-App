import { postReq, responseOrThrow } from './fetch'

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.BACKEND_URL}/api/users`

const getAll = async () => {
  const response = await fetch(baseUrl)
  return await responseOrThrow(response)
}

const createUser = async (credentials) => {
  const request = postReq(baseUrl, credentials)
  const response = await fetch(request)
  return await responseOrThrow(response)
}

export default { getAll, createUser }