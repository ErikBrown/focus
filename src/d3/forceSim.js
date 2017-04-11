// Change this later
import * as d3 from 'd3';

export default function forceSim(vertices, edges, simulation) {
	let svg = d3.select("svg"),
		width = +svg.attr("width"),
		height = +svg.attr("height");
	simulation = d3.forceSimulation()
		.force("link", d3.forceLink().iterations(4))
		.force("charge", d3.forceManyBody().strength(-800))
		.force("center", d3.forceCenter(width/2, height/2))
		.force("collide", d3.forceCollide(50))
		.on("tick", ticked);

	let link = d3.select(".links").selectAll("line");
	if (link.size() === 0) {
		link = svg.append("g")
				.attr("class", "links")
			.selectAll("line");
	}

	let node = d3.select(".nodes").selectAll("circle");
	if (node.size(0) === 0) {
		node = svg.append("g")
			.attr("class", "nodes")
			.selectAll("circle");
	}
	
	restart();


	function restart() {
		node = node.data(vertices, d => d.id);
		node.exit().remove();
		node = node.enter().append("circle")
			.attr("r", 30)
			.attr("fill", "#DCDCDC")
			.merge(node);

		// Create and overwrite existing drag behavior
		node.call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));

		// Makes multiple titles :/
		node.append("title")
			.text(function(d) { return d.name; });


		link = link.data(edges, d => d.source.id + "-" + d.target.id);
		link.exit().remove();
		link = link.enter().append("line")
			.attr("stroke-width", 2).merge(link);

		simulation.nodes(vertices);
		simulation.force("link").links(edges);
		simulation.alpha(1).restart();
	}

	function ticked() {
		link
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
		node
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
	}

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
	}
	return simulation;
}