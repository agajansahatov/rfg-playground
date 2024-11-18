import { ForceGraph2D } from "react-force-graph";

export default function SocialNetworkGraph2D() {
	const data = {
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
	};

	return (
		<div
			style={{
				display: "grid",
				justifyContent: "center",
				alignItems: "center",
				padding: "20px",
			}}
		>
			<h2>Social Network Graph (2D)</h2>
			<ForceGraph2D
				graphData={data}
				width={800}
				height={400}
				nodeAutoColorBy="id"
				linkDirectionalArrowLength={6}
				nodeLabel={(node) => `${node.id} (${node.city}, Age: ${node.age})`} // Hover label
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
