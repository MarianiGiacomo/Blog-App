import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import Togglable from './Togglable'

afterEach(cleanup)


describe('test blog component', () => {
  const blog = {
    title: 'test blog',
    author: 'tester',
    url: 'test-url',
    likes: 1
  }

  test('renders right content', () => {
    const component = render(<SimpleBlog blog={blog} />)

    const blogBody = component.container.querySelector('.blog-body')
    expect(blogBody).toHaveTextContent('test blog by tester')

    const blogLikes = component.container.querySelector('.blog-likes')
    expect(blogLikes).toHaveTextContent('blog has 1 likes')
  })

  test('clicking the likes butotn twice', async () => {
    const mockOnClick = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockOnClick}/>
    )

    const button = getByText('likes')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockOnClick.mock.calls.length).toBe(2)
  })
})

describe('test togglable content', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel={'show...'}>
        <div className='testDiv'/>
      </Togglable>
    )
  })

  test('renders its childer', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the childer are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, childer are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})


