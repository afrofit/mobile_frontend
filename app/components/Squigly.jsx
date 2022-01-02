import * as React from "react";
import styled from "styled-components/native";

const Element = styled.Image`
	width: ${(props) => (props.width ? `${props.width}px` : `100px`)};
	height: 100px;
	resize-mode: contain;
	margin-top: ${(props) => (props.marginV ? `${props.marginV}px` : `-15px`)};
	margin-bottom: ${(props) => (props.marginV ? `${props.marginV}px` : `-15px`)};
	transform: ${(props) => (props.deg ? `rotate(${props.deg}deg)` : "")};
`;

const Squigly = ({ width = "100px", marginV = "-15", deg = 0 }) => {
	const imageSrc = require("../assets/images/elements/squigly_yellow.png");
	return (
		<>
			<Element width={width} deg={deg} source={imageSrc} marginV={marginV} />
		</>
	);
};

export default Squigly;
