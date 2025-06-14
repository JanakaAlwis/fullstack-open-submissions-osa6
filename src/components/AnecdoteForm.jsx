import React, { useState } from 'react'

const AnecdoteForm = ({ addNewAnecdote }) => {
  const [content, setContent] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    addNewAnecdote(content)
    setContent('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
