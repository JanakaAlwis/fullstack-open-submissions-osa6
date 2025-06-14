import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const inputRef = useRef()

  const onSubmit = (event) => {
    event.preventDefault()
    const content = inputRef.current.value.trim()
    if (content) {
      const newAnecdote = {
        id: Math.floor(Math.random() * 1000000),
        content,
        votes: 0,
      }
      dispatch(createAnecdote(newAnecdote))
      dispatch(showNotification(`You added '${content}'`))
      inputRef.current.value = ''
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputRef} />
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
