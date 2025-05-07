import { useState } from 'react'
import { useCallback } from 'react'

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  console.log(votes)
  
  const handleVote = () => {
	  const new_votes = votes
	  new_votes[selected] += 1
	  setVotes(new_votes)
	  forceUpdate()
  }

  return (
    <div>
	  <h1>Anecdote of the day</h1> 
      <p>{anecdotes[selected]}</p>
	  <p>has {votes[selected]} votes</p>
	  <button onClick={handleVote}>vote</button>
	  <button onClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))}>next anecdote</button>
	  <h1>Anecdote with the most votes</h1> 
	  <p>{anecdotes[indexOfMax(votes)]}</p>
    </div>
  )
}

export default App