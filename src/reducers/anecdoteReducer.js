import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const initialState = []

// Async thunk to fetch anecdotes from backend
export const fetchAnecdotes = createAsyncThunk(
  'anecdotes/fetchAll',
  async () => {
    const anecdotes = await anecdoteService.getAll()
    return anecdotes
  }
)

// Async thunk to create new anecdote in backend
export const createAnecdote = createAsyncThunk(
  'anecdotes/create',
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(content)
    return newAnecdote
  }
)

// Async thunk to vote for anecdote (update)
export const voteAnecdote = createAsyncThunk(
  'anecdotes/vote',
  async (id, { getState }) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const returnedAnecdote = await anecdoteService.update(updatedAnecdote)
    return returnedAnecdote
  }
)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnecdotes.fulfilled, (state, action) => {
        return action.payload.sort((a, b) => b.votes - a.votes)
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        const updated = action.payload
        const index = state.findIndex(a => a.id === updated.id)
        if (index !== -1) {
          state[index] = updated
          state.sort((a, b) => b.votes - a.votes)
        }
      })
  }
})

export default anecdoteSlice.reducer
