import styled from "styled-components/native";
import Squigly from "./Squigly";

const PlaceSquiqly = styled.View`
	position: absolute;
	top: ${(props) => (props.top ? `${props.top}px` : "20%")};
`;

const SquiglyFloater = ({ width = 80, top = -20 }) => {
	return (
		<PlaceSquiqly top={top}>
			<Squigly width={width} marginV={15} deg={0} />
		</PlaceSquiqly>
	);
};

export default SquiglyFloater;
