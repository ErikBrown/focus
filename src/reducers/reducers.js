import {combineReducers} from 'redux';

const page = (state, action) => {
	if(typeof state === "undefined") {
		return "/";
	}
	switch (action.type){
		case "/edit":
			return {page: "/edit"};
		default:
			return state
	}
}

const focusReducers = combineReducers({page});

export default focusReducers;