import blogService from '../services/blogs'

const commentReducer = (state = [], action) => {
  switch(action.type){
  case 'GET_COMMENTS':
    return action.data
  case 'ADD_COMMENT':
    return state.concat(action.data)
  default:
    return state
  }
}

export const getBlogComments = (blog) => {
  return async dispatch => {
    const comments = await blogService.getComments(blog.id)
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

export const addComment = (token, comment) => {
  return async dispatch => {
    const newComment = await blogService.createComment(token, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: newComment
    })
  }
}

export default commentReducer