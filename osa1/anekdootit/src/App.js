import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const nextAnecdote = () => {
  setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
      }

  const mostVoted = () => {
    const max = Math.max(...votes)
    const index = votes.indexOf(max)
    return (
      <div>
      {anecdotes[index]}
      <div>has {max} votes</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>
      has {votes[selected]} votes
      <div>
    <Button handleClick={vote} text="vote"/>
    <Button handleClick={nextAnecdote} text="next anecdote"/>
    <h2>Anecdote with most votes</h2>
    {mostVoted()}
      </div>
    </div>
    </div>
  )
}
  
export default App
