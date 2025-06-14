import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAnecdotes,
  createAnecdote,
  updateAnecdote
} from './services/anecdoteService'

const AnecdoteForm = ({ addAnecdote }) => {
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long')
      return
    }
    addAnecdote({ content, votes: 0 })
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write new anecdote"
      />
      <button type="submit">Add Anecdote</button>
    </form>
  )
}

const AnecdoteList = () => {
  const queryClient = useQueryClient()

  const updateMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const vote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const {
    data: anecdotes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (isError) {
    return <div>Anecdote service not available due to server problems</div>
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: 10 }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const addAnecdote = (anecdote) => {
    createMutation.mutate(anecdote)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm addAnecdote={addAnecdote} />
      <AnecdoteList />
    </div>
  )
}

export default App
