import { createSlice } from '@reduxjs/toolkit'

// Initial anecdotes as strings, mapped to objects with id and votes
const initialState = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...',
  'Any fool can write code that a computer can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place.'
].map((content, index) => ({
  content,
  id: index + 1,
  votes: 0
}))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { vote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
