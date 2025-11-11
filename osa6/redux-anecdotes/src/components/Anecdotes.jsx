import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {

  const dispatch = useDispatch()

const anecdotes = useSelector(state => {
  const filter = (state.filter || '').toLowerCase()
  return state.anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter)
  )
})

  const vote = (id) => {
    dispatch(voteAnecdote({ id }))
    dispatch(showNotification(`You voted '${anecdotes.find(a => a.id === id).content}'`, 5))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes
