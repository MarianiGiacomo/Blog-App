import React, { useState } from 'react'
import { 
  BrowserRouter as Router,
  Route, Link, Redirect 
} from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')
  const [submit, setSubmit] = useState(false)

  const padding = { padding: 5 }
  const border = { 
    border: 'solid 1px',
    margin: 10,
    padding: 5 
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setSubmit(true)
    setTimeout(() => {
      setNotification('')
      setSubmit(false)}, 3000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <div>
            <Link style={padding} to='/'>anecdotes</Link>
            <Link style={padding} to='/create'>create new</Link>
            <Link style={padding} to='/about'>about</Link>
          </div>
          {notification ? <div style={border}>{notification}</div>
            : null}
          <Route exact path='/' render={() => <AnecdoteList anecdotes={anecdotes}/>} />
          <Route path='/create' render={() => 
            submit ? <Redirect to='/'/>
            : <CreateNew addNew={addNew} />} />
          <Route path='/about' render={() => <About />} />
          <Route path='/anecdotes/:id' render={({ match }) =>
            <Anecdote anecdote={anecdoteById(match.params.id)}/>}/>
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App;