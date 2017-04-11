import React from 'react'
import {Link} from 'react-router'

export default function Header(props) {
	const icon = props.page === "edit" ? "homeIcon" : "editIcon";
	const path = props.page === "edit" ? "/" : "/edit";
	return (
		<div id="header">
			<Link to={path} className={"viewChangeIcon " + icon} />
			<h1>Focus</h1>
		</div>
	);
}