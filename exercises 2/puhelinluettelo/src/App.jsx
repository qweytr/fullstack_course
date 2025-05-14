import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const Filter = (props) => {
	
	const handleFilterChange = (event) => {
		event.preventDefault()
		console.log(event.target.value)
		props.setFilter(event.target.value)
	}

	return (
		<div>
			filter shown with
			<input 
				value={props.filter}
				onChange={handleFilterChange}
			/>
		</div>
	)
}

const AddNew = (props) => {
	
	const addName = (event) => {
		event.preventDefault()
		
		const allNames = []
		var person = {}
		for (let i=0; i<props.persons.length; i++) {
			allNames.push(props.persons[i].name)
			if (props.persons[i].name === props.newName) {
				person = props.persons[i]
			}
		}
		
		const personObject = {
			name: props.newName,
			number: props.newNumber
		}
		
		if (allNames.includes(props.newName)) {
			if (person.number === props.newNumber) {
				alert(`${props.newName} is already added to phonebook`)
			} else {
				if (window.confirm(`${props.newName} is already added to phonebook. Replace the old number with a new one?`)) {
					personsService.update(person.id, personObject).then(returnedPerson => {
						console.log(returnedPerson)
						const updatedPersons = props.persons.filter(n => n.id !== returnedPerson.id)
						updatedPersons.push(returnedPerson)
						props.setPersons(updatedPersons)
						props.setSuccessMessage(
							`'${props.newName}' succesfully updated`
						)
						setTimeout(() => {
							props.setSuccessMessage(null)
						}, 5000)
					})
				}
			}
		} else {
			personsService.create(personObject).then(returnedPerson => {
				props.setPersons(props.persons.concat(returnedPerson))
				props.setSuccessMessage(
					`'${props.newName}' succesfully added`
				)
				setTimeout(() => {
					props.setSuccessMessage(null)
				}, 5000)
			})
		}
		props.setNewNumber("")
		props.setNewName("")
	}
	
	const handleNameChange = (event) => {
		event.preventDefault()
		console.log(event.target.value)
		props.setNewName(event.target.value)
	}
	  
	const handleNumberChange = (event) => {
		event.preventDefault()
		console.log(event.target.value)
		props.setNewNumber(event.target.value)
	}
	
	return (
		<form onSubmit={addName}>
			<div>
			  name:
			  <input 
				value={props.newName}
				onChange={handleNameChange}
			  />
			</div>
			<div>
			  number:
			  <input 
				value={props.newNumber}
				onChange={handleNumberChange}
			  />
			</div>
			<div>
			  <button type="submit">add</button>
			</div>
		</form>
	)
}

const Numbers = (props) => {
	
	function filterPersons(person) {
		return person.name.toUpperCase().includes(props.filter.toUpperCase())
	}
	
	const handleDelete = (event) => {

		var name = "[name not found]"
		for (let i=0; i<props.persons.length; i++) {
			if (props.persons[i].id === event.target.id){
				name = props.persons[i].name
			}
		}
		
		if (window.confirm(`Delete ${name}?`)) {
		} else { return }
		
		personsService.deleteObject(event.target.id).then(deletedPerson => {
			console.log(deletedPerson)
			props.setSuccessMessage(
				`'${deletedPerson.name}' succesfully deleted`
			)
			setTimeout(() => {
				props.setSuccessMessage(null)
			}, 5000)
		}).catch(error => {
			props.setErrorMessage(
				`Information on ${name} has already been removed from server`
			)
			setTimeout(() => {
				props.setErrorMessage(null)
			}, 5000)
        })
		
		props.setPersons(props.persons.filter(n => n.id !== event.target.id))
	}
	
	return (
		<div>
			{props.persons.filter(filterPersons).map((person, i) =>
				<li key={person.name}> 
					{person.name} {person.number} <button id={person.id} onClick={handleDelete}>delete</button>
				</li>
			)}
		</div>
	)
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.type}>
      {props.message}
    </div>
  )
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)
  
	const hook = () => {
		personsService.getAll().then(initialPersons => {
			setPersons(initialPersons)
		})
	}
	
	useEffect(hook, [])
 
	return (
		<div>
		  <h2>Phonebook</h2>
		  <Notification message={errorMessage} type={"error"}/>
		  <Notification message={successMessage} type={"success"}/>
		  <Filter filter={filter} setFilter={setFilter}/>
		  <h2>add a new</h2>
		  <AddNew newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage}/>
		  <h2>Numbers</h2>
		  <Numbers persons={persons} filter={filter} setPersons={setPersons} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
		</div>
	)

}

export default App