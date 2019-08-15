import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
jest.mock('./hooks')
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  test('if no user logged, blogs are not shown', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.login-form')
    )

    expect(component.container.querySelector('.loggedin-content')).toBe(null)
  })

  test('if user is logged in, blogs are show', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.loggedin-content')
    )
  })
})