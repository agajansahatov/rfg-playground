import React, { useState } from "react";
import { ForceGraph2D } from "react-force-graph";

interface Node {
	id: string;
	age: number;
	city: string;
}

interface Link {
	source: string;
	target: string;
}

export default function SocialNetworkGraph2D() {
	// Manage graph data in state
	const [graphData, setGraphData] = useState({
		nodes: [
			{ id: "Alice", age: 25, city: "New York" },
			{ id: "Bob", age: 30, city: "San Francisco" },
			{ id: "Charlie", age: 35, city: "Boston" },
			{ id: "Damon", age: 35, city: "Virginia" },
		],
		links: [
			{ source: "Alice", target: "Bob" },
			{ source: "Bob", target: "Charlie" },
			{ source: "Alice", target: "Charlie" },
			{ source: "Damon", target: "Bob" },
		],
	});

	const [newNode, setNewNode] = useState({ id: "", age: 0, city: "" });
	const [connectTo, setConnectTo] = useState<string>("");
	const [connectionType, setConnectionType] = useState<"source" | "target">(
		"source",
	);

	const handleAddNode = () => {
		if (!newNode.id.trim() || newNode.age <= 0 || !newNode.city.trim()) {
			alert("Please provide valid node details.");
			return;
		}

		// Check if the node already exists
		if (graphData.nodes.find((node) => node.id === newNode.id)) {
			alert("Node with this ID already exists.");
			return;
		}

		// Add the new node and optionally connect it
		setGraphData((prevData) => ({
			nodes: [...prevData.nodes, newNode],
			links: connectTo
				? [
						...prevData.links,
						connectionType === "source"
							? { source: newNode.id, target: connectTo }
							: { source: connectTo, target: newNode.id },
				  ]
				: prevData.links,
		}));

		// Reset inputs
		setNewNode({ id: "", age: 0, city: "" });
		setConnectTo("");
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "20px",
			}}
		>
			<h2>Social Network Graph (2D)</h2>

			{/* Form for adding a new node */}
			<div style={{ marginBottom: "20px" }}>
				<input
					type="text"
					placeholder="Node ID"
					value={newNode.id}
					onChange={(e) => setNewNode({ ...newNode, id: e.target.value })}
					style={{ marginRight: "10px", padding: "5px" }}
				/>
				<input
					type="number"
					placeholder="Age"
					value={newNode.age}
					onChange={(e) =>
						setNewNode({ ...newNode, age: Number(e.target.value) })
					}
					style={{ marginRight: "10px", padding: "5px" }}
				/>
				<input
					type="text"
					placeholder="City"
					value={newNode.city}
					onChange={(e) => setNewNode({ ...newNode, city: e.target.value })}
					style={{ marginRight: "10px", padding: "5px" }}
				/>
				<input
					type="text"
					placeholder="Connect to Node"
					value={connectTo}
					onChange={(e) => setConnectTo(e.target.value)}
					style={{ marginRight: "10px", padding: "5px" }}
				/>
				<select
					value={connectionType}
					onChange={(e) =>
						setConnectionType(e.target.value as "source" | "target")
					}
					style={{ marginRight: "10px", padding: "5px" }}
				>
					<option value="source">as Source</option>
					<option value="target">as Target</option>
				</select>
				<button onClick={handleAddNode} style={{ padding: "5px 10px" }}>
					Add Node
				</button>
			</div>

			{/* ForceGraph2D Component */}
			<ForceGraph2D
				graphData={graphData}
				width={800}
				height={400}
				nodeAutoColorBy="id"
				linkDirectionalArrowLength={6}
				nodeLabel={(node: Node) =>
					`${node.id} (${node.city}, Age: ${node.age})`
				} // Hover label
				backgroundColor="#e3e3e3"
				nodeRelSize={10}
				nodeCanvasObjectMode={() => "after"}
				nodeCanvasObject={(node, ctx, globalScale) => {
					const label = node.id;
					const fontSize = 12 / globalScale;
					ctx.font = `${fontSize}px Sans-Serif`;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillStyle = "black";
					ctx.fillText(label, node.x!, node.y!);
				}}
				onNodeClick={(node) =>
					console.log(`${node.id} (${node.city}, Age: ${node.age})`)
				}
				onLinkClick={(link) => {
					console.log(link);
				}}
			/>
		</div>
	);
}
