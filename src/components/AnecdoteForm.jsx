import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content.trim() === '') return

    dispatch(addAnecdote(content))
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addNewAnecdote}>
      <input name="anecdote" />
      <button type="submit">add anecdote</button>
    </form>
  )
}

export default AnecdoteForm
