const Header = (props) => {
    console.log(props)
    return <h1>{props.course}</h1>
}

const Part = (props) => {
  return (
    <div>
    {props.part.name} has <b>{props.part.exercices}</b> exercices.
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
    <Part part={props.parts[0]}/>
    <Part part={props.parts[1]}/>
    <Part part={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      All parts contain a total of <b>{props.parts[0].exercices + props.parts[1].exercices + props.parts[2].exercices}</b> exercices.
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercices: 10
      },
      {
        name: 'Using props to pass data',
        exercices: 7
      },
      {
        name: 'State of a component',
        exercices: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default App