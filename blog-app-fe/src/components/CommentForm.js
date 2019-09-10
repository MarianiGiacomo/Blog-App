import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

import { addComment } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'
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
      comment.setValue('')
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not add the comment: ${exception.message}` }, 3)
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor='comment'>Leave a comment:</label>
          <input
            id='comment'
            type={comment.type}
            value={comment.value}
            onChange={comment.onChange}
          />
        </Form.Field>
        <Button type='submit' style={styles.button}>Save</Button>
      </Form>
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