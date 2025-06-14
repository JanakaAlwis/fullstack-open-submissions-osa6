const initialState = [
  { id: 1, content: 'If it hurts, do it more often', votes: 0 },
  { id: 2, content: 'Adding manpower to a late software project makes it later!', votes: 0 },
  { id: 3, content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...', votes: 0 },
  { id: 4, content: 'Any fool can write code that a computer can understand.', votes: 0 },
  { id: 5, content: 'Premature optimization is the root of all evil.', votes: 0 },
  { id: 6, content: 'Debugging is twice as hard as writing the code in the first place.', votes: 0 },
]

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      return state
        .map(anecdote => 
          anecdote.id !== action.payload.id 
            ? anecdote 
            : { ...anecdote, votes: anecdote.votes + 1 }
        )
        .sort((a, b) => b.votes - a.votes)

    case 'ADD_ANECDOTE':
      return [...state, action.payload]

    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: {
      id: Math.floor(Math.random() * 1000000),
      content,
      votes: 0
    }
  }
}

export default anecdoteReducer
