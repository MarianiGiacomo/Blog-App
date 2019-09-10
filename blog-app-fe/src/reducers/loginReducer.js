const initialState = {
  token: '',
  username: '',
  name: '',
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_TOKEN':
    return { ...state, token: `bearer ${action.data}` }
  case 'SET_USER':
    return { ...state, username: action.data.username, name: action.data.name }
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