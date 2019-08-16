
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  blogs: blogReducer
})

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)