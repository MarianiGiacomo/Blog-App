
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import PromisePolyfill from 'promise-polyfill'

import App from './App'
import store from './store'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

render()