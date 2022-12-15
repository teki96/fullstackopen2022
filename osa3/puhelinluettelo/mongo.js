const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.l6219qk.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if (process.argv.length > 4) {
  person
    .save()
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
        mongoose.connection.close()
      })
    })
}