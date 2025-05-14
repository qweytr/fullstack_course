
const Course = (props) => {
	return ( 
		<div>
			<Header course={props.course} />
			<Content course={props.course} />
			<Total course={props.course} />
		</div>
	)
}

const Header = (props) => {
	return ( 
		<div>
			<h1>{props.course.name}</h1> 
		</div>
	)
}

const Content = (props) => {
	const total = props.course.parts.reduce( (s, p) => s+1, 0 )
	console.log("Number of parts:", total)
	return ( 
		<div>
			{props.course.parts.map((part, i) =>
				<li key={i}> {part.name} {part.exercises} </li>
			)}
		</div>
	)
}

const Total = (props) => {
	let exercises = 0
	for (let i = 0; i < props.course.parts.length; i++) {
	  exercises += props.course.parts[i].exercises
	} 
	return ( 
		<div>
			<p>Number of exercises {exercises}</p>
		</div>
	)
}

export default Course