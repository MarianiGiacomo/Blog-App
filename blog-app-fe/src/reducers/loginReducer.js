import loginService from '../services/login'

const loginReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_TOKEN':
    const token = `bearer ${action.data}`
    return { ...state, token: token }
  case 'SET_USER':
    const user = { 
      username: action.data.username,
      name: action.data.name
    }
    return { ...state, user: user }
  default:
    return state
  }
}

export const setToken = (token) => {
  return async dispatch => {
    dispatch({
      type: 'SET_TOKEN',
      data: token
    })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export default loginReducer