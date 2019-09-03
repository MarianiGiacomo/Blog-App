import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)  
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [ ...state, action.data ]
  case 'LIKE':
    return state.map(blog =>
      blog.id !== action.data.id? blog : action.data
    )
  case 'REMOVE':
    return state.filter(blog => 
      blog.id !== action.data.id
    )
  default:
    return state
  }  
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (token, blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(token, blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(
      { ...blog, likes: blog.likes +1 }
    )
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const removeBlog = (token, blog) => {
  return async dispatch => {
    await blogService.remove(token, blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog
    })
  }
}

export default blogReducer