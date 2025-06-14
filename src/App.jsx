import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAnecdotes, voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'
import { showNotification } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filtered = anecdotes.filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  const handleVote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`You voted for '${content}'`, 5))
  }

  return (
    <div>
      {filtered.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnecdotes())
  }, [dispatch])

  const addNewAnecdote = async (content) => {
    dispatch(createAnecdote(content))
    dispatch(showNotification(`You added '${content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm addNewAnecdote={addNewAnecdote} />
    </div>
  )
}

export default App
