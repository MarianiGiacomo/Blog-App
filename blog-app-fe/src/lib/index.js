export const filterBlogs = (blogs, user) => {
  return blogs.filter(blog => {
    return blog.user.username === user.username
  }
  )
}

export const getFieldsValues = (...fields) => {
	const credentials = {}
	fields.forEach(f => {
		credentials[f.name] = f.value
	})
	return credentials
}

export const checkUrl = (url) => {
  if(url.substring(0,7) === 'http://' | url.substring(0,8) === 'https://'){
    return true
  }
  return false
}

export const populateWithBlogs = (users, blogs) => {
	return users.map( u => {
		let uBlogs = blogs.filter( b => b.user.id === u.id )
		return { ...u, blogs: uBlogs }
	})
} 

export const emptyObj = (obj) => Object.keys(obj).length === 0

export const postReq = (url, data) => {
  return new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}