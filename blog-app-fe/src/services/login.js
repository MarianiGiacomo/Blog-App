import { postReq, responseOrThrow } from './fetch'

// eslint-disable-next-line no-undef
const baseUrl = `${process.env.BACKEND_URL}/api/login`

const login = async credentials => {
  const request = postReq(baseUrl, credentials)
  const response = await fetch(request)
  return await responseOrThrow(response)
}

export default { login }