export const filterBlogs = (blogs, user) => {
  return blogs.filter(blog => {
    return blog.user.username === user.username
  }
  )
}

export const getCredentials = (...fields) => {
	const credentials = {}
	fields.forEach(f => {
		credentials[f.name] = f.value
	})
	return credentials
}