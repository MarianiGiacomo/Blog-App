
const notificationReducer = (state = {}, action) => {
  console.log('state now: ', state)
  console.log('action', action)  
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = ( (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: ''
      })
    }, time*1000)
  }
})

export default notificationReducer