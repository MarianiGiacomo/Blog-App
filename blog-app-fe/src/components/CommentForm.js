import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

import { addComment } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'
import styles from '../style/styles'

const CommentForm = (props) => {
  const comment = useField('text')
  const { login, blog } = props

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newComment = {
      comment: comment.value,
      timeStamp: new Date().toDateString(),
      blog: blog.id
    }
    try {
      await props.addComment(login.token, newComment)
      props.setNotification({ message: `A new comment "${newComment.comment}" added` }, 3)
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not add the comment: ${exception.message}` }, 3)
    }
  }

  return (
    <div>
      <label htmlFor='comment'>Leave a comment:</label>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id='comment'
            { ...comment }
          />
        </div>
        <button type='submit' style={styles.button}>Save</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = {
  addComment,
  setNotification,
}

CommentForm.propTypes = {
  login: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)