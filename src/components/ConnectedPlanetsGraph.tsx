import { ForceGraph3D } from "react-force-graph";
import * as THREE from "three";

interface Node {
	id: string;
	size: number;
	color: string;
}

export default function ConnectedPlanetsGraph() {
	const data = {
		nodes: [
			{ id: "Earth", size: 20, color: "blue" },
			{ id: "Mars", size: 15, color: "red" },
			{ id: "Venus", size: 12, color: "orange" },
			{ id: "Jupiter", size: 30, color: "brown" },
			{ id: "Saturn", size: 25, color: "gold" },
		],
		links: [
			{ source: "Earth", target: "Mars" },
			{ source: "Earth", target: "Venus" },
			{ source: "Mars", target: "Jupiter" },
			{ source: "Jupiter", target: "Saturn" },
			{ source: "Venus", target: "Saturn" },
		],
	};

	const handleNodeClick = (node: Node) => {
		alert(`Welcome to ${node.id}!`);
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
			<h2>Connected Planets Graph (3D)</h2>
			<ForceGraph3D
				graphData={data}
				width={1000}
				height={500}
				nodeVal={10}
				linkWidth={2}
				nodeLabel={(node: Node) => `${node.id}`}
				nodeAutoColorBy="color"
				nodeThreeObjectExtend={true}
				nodeThreeObject={(node: Node) => {
					// Create a sphere for the node
					const sphere = new THREE.Mesh(
						new THREE.SphereGeometry(node.size / 2, 16, 16),
						new THREE.MeshStandardMaterial({ color: node.color }),
					);
					return sphere;
				}}
				linkDirectionalArrowLength={6}
				onNodeClick={handleNodeClick}
				backgroundColor="#000000"
			/>
		</div>
	);
}
