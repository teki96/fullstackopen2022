import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [foundPersons, setFoundPersons] = useState(persons)
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFoundPersons(initialPersons)
      })
  }, [])

  const filterList = (event) => {
    const keyword = event.target.value
    const personsCopy = [...persons]

    if (keyword !== '') {
      const results = personsCopy.filter((person) => {
        return person.name.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setFoundPersons(results)
    } else {
      setFoundPersons(persons)
    }
    setSearch(keyword)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personsCopy = [...persons]
    const personObject =
    {
      name: newName,
      number: newNumber
    }

    const isDuplicate = personsCopy.some(person => person.name === newName)

    if (!isDuplicate) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFoundPersons(foundPersons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `${returnedPerson.name} was added successfully!`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 4000)
        })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        const personId = personsCopy.find(person => person.name === newName)
        personService
          .update(personId.id, personObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setFoundPersons(foundPersons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(
              'Phone number was updated successfully!'
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 4000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server.`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 4000)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setFoundPersons(foundPersons.filter(person => person.id !== id))
        })
      setSuccessMessage(
        `${name} was deleted successfully!`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 4000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={search} filterList={filterList}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Persons
        foundPersons={foundPersons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App