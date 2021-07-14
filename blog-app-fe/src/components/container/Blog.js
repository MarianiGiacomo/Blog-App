import { React, useState, connect, PropTypes, likeBlog, removeBlog, useEffect, 
	setNotification, getBlogComments, styles, CommentForm, Button, Redirect, List, 
Togglable, emptyObj, useField, addComment } from '../../imports'

const Blog = (props) => {
  const [removed, setRemoved] = useState(false)
	const [blog, setBlog] = useState({})
  const comment = useField('text', 'comment')
  const { blogs, comments, login, removeBlog, match,
		setNotification, getBlogComments, likeBlog, addComment } = props
	
	useEffect(() => {
		if(!emptyObj(blog) && !removed) getBlogComments(blog)	
	},[blog, comment])

	// On page load, after fetching blogs, get blog from url param.
	useEffect(() => {
			if(blogs.length && emptyObj(blog)) { 
				const foundBl = blogs.find(b => b.id === match.params.id)
			setBlog(foundBl)
			}
	},[blogs])

  function remove(blog) {
    if(window.confirm(`Do you want to remove the blog ${blog.title} by ${blog.author}?`)) {
			try {
				removeBlog(login.token, blog)
				setRemoved(true)
				setNotification({ message: `Blog ${blog.title} by ${blog.author} removed` }, 3)
			} catch (exception) {
				setNotification({ error: `Could not remove the blog: ${exception.message}` }, 3)
			}
		}
	}

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newComment = {
      comment: comment.value,
      timeStamp: new Date().toDateString(),
      blog: blog.id
    }
    try {
      await addComment(login.token, newComment)
      setNotification({ message: `A new comment "${newComment.comment}" added` }, 3)
      comment.setValue('')
    } catch (exception) {
      setNotification({ error: `Could not add the comment: ${exception.message}` }, 3)
    }
  }

	if(removed | blog === undefined){
		return <Redirect to="/blogs"/>
	}	
  else if(emptyObj(blog)){
		return (
			<main>
				<div className="loader"></div>
				<p>Fetching blog...</p>
			</main>
		)
  } 
	else {
		return (
			<main>
				<h1>{blog.title} by {blog.author}</h1>
				<p><a href={blog.url} target='_blank' rel='noopener noreferrer' >{blog.url}</a></p>
				<p>Likes: {blog.likes}</p>
				<Button
					onClick={() => likeBlog(blog)}
					style={styles.button}
				>Like
				</Button>
				<p>Added by {blog.user.name}</p>
				{
					login.username === blog.user.username?
						<div>
							<Button
								onClick={() => remove(blog)}
								style={styles.button}
							>Remove
							</Button>
						</div>
						: null
				}
				<Togglable buttonLabel='Add comment'>
					<CommentForm comment={comment} handleSubmit={handleSubmit}/>
				</Togglable>
				<h2>Comments</h2>
				<List divided relaxed>
					{
						comments.length?
							comments.map((b,i) =>
								<List.Item
									key={i}
									style={styles.listLi}
								><p>{b.comment}</p><p>by {b.user.name} - {b.timeStamp}</p>
								</List.Item>
							)
							:
								<List.Item
									style={styles.listLi} >
									<p>No comments yet</p>
								</List.Item>
					}
				</List>
			</main>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    comments: state.comments,
    login: state.login,
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification,
  getBlogComments,
	addComment
}

Blog.propTypes = {
  login: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  getBlogComments: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)