import * as React from "react";
import styled from "styled-components/native";

import { COLORS } from "../../theme/colors";
import { DEVICE_WIDTH } from "../../theme/globals";
import SquiglyFloater from "../SquiglyFloater";

const TitleText = styled.Text`
	font-family: "Regular";
	font-size: 25px;
	letter-spacing: 0.5px;
	text-transform: capitalize;
	color: ${COLORS.white};
`;

const Container = styled.View`
	height: 7%;
	width: ${DEVICE_WIDTH};
	margin-bottom: 30px;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* background-color: red; */
`;

const PageHeaderLarge = ({
	title = `WELCOME ${"   "}//${"   "} OlasupoODebiyi`,
}) => {
	return (
		<Container>
			<TitleText>{title}</TitleText>
			<SquiglyFloater width={120} top="-13" />
		</Container>
	);
};

export default PageHeaderLarge;
