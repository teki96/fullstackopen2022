import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
    <td>{props.text} {props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.value1 === 0 && props.value2 === 0 && props.value3 === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
    return (
    <table>
    <tbody>
      <StatisticLine text="good" value={props.value1} />
      <StatisticLine text="neutral" value={props.value2} />
      <StatisticLine text="bad" value={props.value3} />
      <StatisticLine text="all" value={props.value1 + props.value2 + props.value3} />
      <StatisticLine text="average" value={(props.value1 - props.value3) / (props.value1 + props.value2 + props.value3)} />
      <StatisticLine text="positive" value={(props.value1 / (props.value1 + props.value2 + props.value3) * 100) + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodCount = () => setGood(good + 1)
  const increaseNeutralCount = () => setNeutral(neutral + 1)
  const increaseBadCount = () => setBad(bad + 1)

  return (
    <div>
    <h1>give feedback</h1>
      <Button handleClick={increaseGoodCount} text='Good'/>
      <Button handleClick={increaseNeutralCount} text='Neutral' />
      <Button handleClick={increaseBadCount} text='Bad' />
      <h2>statistics</h2>
      <Statistics 
      text1='Good' value1={good}
      text2='Neutral' value2={neutral}
      text3='Bad' value3={bad}
      />
    </div>
  )
}

export default App