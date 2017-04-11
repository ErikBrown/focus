import React from 'react'
import Header from './header.js'

export default function CurrentTask(props) {
	return(
		<div>
			<Header page="" />
			<div id="currentTaskWrapper">
				<CurrentTaskText taskID="1" taskName="My Current Task" />
				<button id="completedButton" onClick={()=>alert("sdf")} className="currentTaskButton">C</button>
				<button id="skipButton" className="currentTaskButton">Skip</button>
			</div>
		</div>
	);
}

function CurrentTaskText(props) {
	return(
		<div id="currentTask">{props.taskName}</div>
	);
}