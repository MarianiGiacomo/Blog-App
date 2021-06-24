import axios from 'axios'

const baseUrl = `${process.env.BACKEND_URL}/api/users`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async (credentials) => {
  const request = new Request(baseUrl, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  let response = await fetch(request)
  if (response.ok) {
    let json = await response.json()
    return json
  } else {
    throw new Error(response.statusText)
  }
}

export default { getAll, createUser }