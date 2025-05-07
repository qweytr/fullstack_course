import { useState } from 'react'

const Button = (props) => {
	return (
		<div>
		  <button onClick={() => props.func(props.value + 1)}>{props.label}</button>
		</div>
	) 
}

const StatisticLine = (props) => {
	return (
		<div>
			<p>{props.text} {props.value}</p>
		</div>
	) 
}

const Statistics = (props) => {
  const total = () => { return props.good + props.neutral + props.bad }
  const average = () => { return (props.good - props.bad)/total() }
  const positive = () => { return 100*props.good/total() }
  
  if (total() === 0) {
	  return (
		<div>
		  <h1>statistics</h1> 
		  <p>No feedback given</p>
		</div>
	  ) 
  }
  return (
    <div>
	  <h1>statistics</h1> 
	  <StatisticLine text={"good"} value={props.good}/>
	  <StatisticLine text={"neutral"} value={props.neutral}/>
	  <StatisticLine text={"bad"} value={props.bad}/>
	  <StatisticLine text={"average"} value={average()}/>
	  <StatisticLine text={"positive"} value={positive()+"%"}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = () => { return good + neutral + bad }
  const average = () => { return (good - bad)/total() }
  const positive = () => { return 100*good/total() }
  
  return (
	<>
	  <h1>give feedback</h1> 
	  <tr>
		  <td><Button func={setGood} value={good} label={"good"}/></td>
		  <td><Button func={setNeutral} value={neutral} label={"neutral"}/></td>
		  <td><Button func={setBad} value={bad} label={"bad"}/></td>
	  </tr>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
	</>
  )
}

export default App