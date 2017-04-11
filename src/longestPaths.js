// The graph should be represented as an adjacency list: an array of objects
// each with a "children" property that is an array of indices


// Does a topological sort then loops through the topological
// order updating the max depth of each child vertex.
function longestPaths(g) {
	const topologicalOrder = topologicalSort(g);
	let depth = g.map(() => 0);

	topologicalOrder.forEach((vertex) => {
		g[vertex].children.forEach((child) => {
			depth[child] = Math.max(depth[child], depth[vertex] + 1);
		});
	});

	return depth;
}

// 1) Determines in-degree of each vertex
// 2) Puts vertex with in-degree 0 into a queue
// 3) Removes vertex from queue and updates in-degree of children
// 4) Repeat 2 & 3 until queue is empty
function topologicalSort(g) {
	let inDegree = g.map(() => 0);
	
	// Update inDegree
	g.forEach((vertex) => {
		vertex.children.forEach((child) => {
			inDegree[child]++;
		});
	});

	// Create queue from inDegrees of 0
	let queue = inDegree.filter((val) => val === 0);

	let topologicalOrder = [];

	function reduceIndegree(node) {
		topologicalOrder.push(node);
		g[node].children.forEach((child) => {
			inDegree[child]--;
			if(inDegree[child] === 0) {
				queue.push(child);
			}
		});
	}

	while(queue.length > 0) {
		reduceIndegree(queue.shift());
	}
	
	return topologicalOrder;
}

module.exports = {
	longestPaths,
	topologicalSort
}