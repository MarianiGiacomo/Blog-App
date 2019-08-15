import { useState } from 'react'
import axios from 'axios'


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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const setInitial = initialArray => {
    setResources(initialArray)
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const create = async (user, newObject) => {
    setToken(user.token)
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    setResources(resources.concat(response.data))
    return response.data
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  }

  const remove = async (user, id) => {
    setToken(user.token)
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response
  }

  const service = {
    setToken,
    setInitial,
    create,
    getAll,
    update,
    remove,
  }

  return [
    resources, service
  ]
}