import { useSelector, useDispatch } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {

const dispatch = useDispatch()

const anecdotes = useSelector(state => {
  const filter = (state.filter || '').toLowerCase()
  return state.anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter)
  )
})

  const vote = (anecdote) => {
    dispatch(handleVote(anecdote))
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            <div>{anecdote.content}</div>
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes
