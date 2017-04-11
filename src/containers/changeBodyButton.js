import React from 'react'
import { connect } from 'react-redux'
import {toggleEdit} from '../actions/actions.js'
import {Link} from 'react-router'

const mapStateToProps = (state) => {
	return state.editing;
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: () => {
			dispatch(toggleEdit());
		}
	}
}

let ChangeBodyButton = ({onClick, editing}) => {
	let icon = editing ? "editIcon" : "homeIcon";
	let path = editing ? "/edit" : "/";
	history.replaceState({}, "", path);
	return (<Link
		className={"viewChangeIcon " + icon} 
		onClick={
			e => {
				e.preventDefault();
				onClick();
			}
		}></Link>);
}

ChangeBodyButton = connect(mapStateToProps,	mapDispatchToProps)(ChangeBodyButton);

export default ChangeBodyButton;