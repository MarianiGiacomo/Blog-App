import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { Provider } from 'react-redux'

import store from './store'
import App from './App'

jest.mock('./services/blogs')
jest.mock('./hooks')

afterEach(cleanup)

describe('<App />', () => {
  test('if no user logged, blogs are not shown', async () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    component.rerender(
      <Provider store={store}>
        <App />
      </Provider>
    )
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
      <Provider store={store}>
        <App />
      </Provider>
    )

    component.rerender(
      <Provider store={store}>
        <App />
      </Provider>
    )
    await waitForElement(
      () => component.container.querySelector('.loggedin-content')
    )
  })
})