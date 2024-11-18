import ConnectedPlanetsGraph from "./components/ConnectedPlanetsGraph";
import HelloWorld from "./components/HelloWorld";
import RFG from "./components/RFG";
import SocialNetworkGraph2D from "./components/SocialNetworkGraph2D";

export default function App() {
	return (
		<>
			<HelloWorld />
			<RFG />
			<SocialNetworkGraph2D />
			<ConnectedPlanetsGraph />
		</>
	);
}
