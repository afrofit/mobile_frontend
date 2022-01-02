import * as React from "react";
import styled from "styled-components/native";

export const Element = styled.Image`
	height: ${(props) => (props.height ? `${props.height}px` : `20px`)};
	/* height: 20px; */
	width: 300px;
	resize-mode: contain;
	transform: ${(props) => (props.deg ? `rotate(${props.deg}deg)` : "")};
`;

const Container = styled.View`
	/* background-color: red; */
	justify-content: center;
`;

const ThreeStarsElement = ({ variant = "yellow", height = "20" }) => {
	return (
		<Container>
			{variant === "yellow" ? (
				<Element
					height={height}
					source={require("../assets/images/elements/three_stars_yellow.png")}
				/>
			) : (
				<Element
					height={height}
					source={require("../assets/images/elements/three_stars_gray.png")}
				/>
			)}
		</Container>
	);
};

export default ThreeStarsElement;
