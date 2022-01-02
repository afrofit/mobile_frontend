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

const Card = ({ children, color = COLORS.darker }) => {
	return <Background color={color}>{children}</Background>;
};

export default Card;
