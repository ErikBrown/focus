import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, combineReducers} from 'redux';
import {longestPaths, topologicalSort} from './longestPaths.js';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});

it('topological sorts', () => {
	let expected = [0,1,5,8,6,4,7,2,3,9];
	let sorted = topologicalSort(graph);
	expect(sorted).toEqual(expected);
});

it('longest paths', () => {
	let expected = [0,1,3,3,2,1,2,2,1,4];
	let lPath = longestPaths(graph);
	expect(lPath).toEqual(expected);
});

var graph = [
	{"name": "task #1", "children": [1, 5, 8]},
	{"name": "task #2", "children": [4,6]},
	{"name": "task #3", "children": []},
	{"name": "task #4", "children": [9]},
	{"name": "task #5", "children": [2]},
	{"name": "task #6", "children": [4,7]},
	{"name": "task #7", "children": []},
	{"name": "task #8", "children": [3]},
	{"name": "task #9", "children": []},
	{"name": "task #10", "children": []}
];

function counter(state, action) {
	if (typeof state === 'undefined') {
		return 0;
	}

	switch(action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

const color = (state, action) => {
	if (typeof state === 'undefined') {
		return "black";
	}

	if(action.type === "COLOR") {
		return action.color;
	} else 
	return state;
}

let testApp = combineReducers({counter, color});
let store = createStore(testApp);

it('does stuff', () => {
	store.dispatch({type: "INCREMENT"});
	store.dispatch({type: "INCREMENT"});
	store.dispatch({type: "COLOR", color:"blue"});
	expect(store.getState()).toEqual({"color": "blue", "counter": 2});
});