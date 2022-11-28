const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part course={props.course} />
    </div>
  )
}

const Part = (props) => {
  return (
    props.course.map(course =>
      <div key={course.id}>
        {course.name} {course.exercises}
      </div>
    )
  )
}

const Total = (props) => {
  const total =
    props.course.reduce((sum, course) =>
      sum + course.exercises, 0)
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Course = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    course.map(course =>
      <div key={course.id}>
        <Header course={course.name} />
        <Content course={course.parts} />
        <Total course={course.parts} />
      </div>
    )
  )
}

export default Course