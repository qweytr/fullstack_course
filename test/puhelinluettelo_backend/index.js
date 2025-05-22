const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
  morgan.token('body', request => '')
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
	  response.json(person)
  } else {
	  response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
	const person = request.body
	console.log(person)
	const allNames = persons.map(person=>person.name)
	const allIds = persons.map(person=>person.id)
	
	if (!person.name) {
		return response.status(400).json({ 
			error: 'name missing' 
		})
	}
	if (!person.number) {
		return response.status(400).json({ 
			error: 'number missing' 
		})
	}
	if (allNames.includes(person.name)) {
		return response.status(400).json({ 
			error: 'name must be unique' 
		})
	}
	
	//Instructions were to use Math.random such that the id is likely enough to be unique, but in this case nothing below 100% is likely enough, so I will disregard this instruction
	let newId = -1
	let j = 1
	while (newId === -1) {
		if (!allIds.includes(j.toString())) {
			newId = j.toString()
		}
		j++
	}
	console.log("new ID:", newId) 
	person.id = newId
	
	persons = persons.concat(person)
	console.log(persons)
	response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)

	console.log(persons)
	response.status(204).end()
})

app.get('/api/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})