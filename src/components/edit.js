import React from 'react'
import {longestPaths} from '../longestPaths.js'
import forceSim from '../d3/forceSim.js'
import Header from './header.js'

export default class EditTask extends React.Component {
	constructor(props) {
		super(props);
		this.convertGraph = this.convertGraph.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {graph:[
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
		]};
	}

	convertGraph(graph) {
		let lPath = longestPaths(graph);
		let vertices = [],
				edges = [];

		// Put vertices and edges into arrays
		for(let i = 0; i < graph.length; i++) {
			// 
			vertices.push({id: i, name:graph[i].name, fy: (lPath[i] + 1) * 100});
			for(let j = 0; j < graph[i].children.length; j++) {
				edges.push({source: i, target: graph[i].children[j], index: 0})
			}
		}
		return {nodes: vertices, links: edges};
	}

	componentDidMount() {
		let graph = this.convertGraph(this.state.graph);
		let simulation = forceSim(graph.nodes, graph.links);
		this.setState({simulation: simulation})
	}

	componentWillUnmount() {
		// Kill sim?
	}

	handleSubmit(n, e) {
		let node = {"name": n, "children": []};
		let edges = e.split(",").map(Number).sort((a, b) => (b - a));

		this.setState((prevState, props) => {
			let g = prevState.graph;
			let id = g.length;
			let edgeIndex = edges.length - 1;
			let graph = g.map((val, i) => {
				if(edges[edgeIndex] === i) {
					edgeIndex--;
					return Object.assign({}, val, {children: val.children.concat(id)});
				}
				return val;
			}).concat(node);

			let d3Graph = this.convertGraph(graph);
			forceSim(d3Graph.nodes, d3Graph.links, this.state.simulation);

			return {graph: graph};
		});
	}

	render() {
		return(
			<div>
				<Header page="edit" />
				<div>
					<svg width="960" height="700"></svg>
					<NewTask onSubmit={this.handleSubmit} />
				</div>
			</div>
		);
	}
}

class NewTask extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {"name": "", "parents": ""};
	}

	handleChange(event, key) {
		this.setState({[key]: event.target.value});
	}

	handleSubmit(event) {
		if(this.state.name === "" || this.state.parents === "") {
			event.preventDefault();
			return;
		}
		this.props.onSubmit(this.state.name, this.state.parents);
		this.setState({"name": "","parents": ""});
		event.preventDefault();
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Name" onChange={(e) => this.handleChange(e, "name")}  value={this.state.name}/>
				<input type="text" placeholder="Parent Nodes..." onChange={(e) => this.handleChange(e, "parents")}  value={this.state.parents}/>
				<input type="submit" value="submit"/>
			</form>
			);
	}
}