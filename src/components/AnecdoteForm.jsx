import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../NotificationContext'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      showNotification(`You added '${newAnecdote.content}'`, 'info', 5)
    },
    onError: () => {
      showNotification('Anecdote must be at least 5 characters long', 'error', 5)
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
