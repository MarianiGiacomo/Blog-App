import axios from 'axios'
import { postReq } from '../lib'

const baseUrl = `${process.env.BACKEND_URL}/api/users`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async (credentials) => {
	const request = postReq(baseUrl, credentials);
  let response = await fetch(request)
  if (response.ok) {
    let json = await response.json()
    return json
  } else {
    throw new Error(response.statusText)
  }
}

export default { getAll, createUser }