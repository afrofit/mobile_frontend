import * as React from "react";
import styled from "styled-components/native";

export const Element = styled.Image`
	height: ${(props) => (props.height ? `${props.height}px` : `30px`)};
	/* height: 20px; */
	width: ${(props) => (props.width ? `${props.width}px` : `30px`)};
	resize-mode: contain;
	transform: ${(props) => (props.deg ? `rotate(${props.deg}deg)` : "")};
`;

const Container = styled.View`
	/* background-color: red; */
	justify-content: center;
`;

const OneStarElement = ({ variant = "yellow", height = "30", width = 40 }) => {
	return (
		<Container>
			{variant === "yellow" ? (
				<Element
					height={height}
					width={width}
					source={require("../assets/images/elements/x_yellow.png")}
				/>
			) : (
				<Element
					height={height}
					width={width}
					source={require("../assets/images/elements/x_gray.png")}
				/>
			)}
		</Container>
	);
};

export default OneStarElement;
