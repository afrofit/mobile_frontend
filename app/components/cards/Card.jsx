import * as React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../theme/colors";
import { BORDER_RADIUS_MID, MARGIN_VERTICAL } from "../../theme/globals";

const Background = styled.View`
	width: 95%;
	min-height: 30px;
	background-color: ${(props) => (props.color ? props.color : COLORS.darker)};
	padding: 20px;
	border-radius: ${BORDER_RADIUS_MID};
	margin-bottom: ${MARGIN_VERTICAL};
`;

const OutlineBackground = styled.View`
	width: 95%;
	min-height: 30px;
	padding: 20px;
	border-radius: ${BORDER_RADIUS_MID};
	margin-bottom: ${MARGIN_VERTICAL};
	border-width: 1px;
	border-color: ${COLORS.grayDarker};
`;

const Card = ({ children, color = COLORS.darker, outline = false }) => {
	if (outline) {
		return (
			<OutlineBackground outline={outline} color={color}>
				{children}
			</OutlineBackground>
		);
	} else
		return (
			<Background outline={outline} color={color}>
				{children}
			</Background>
		);
};

export default Card;
