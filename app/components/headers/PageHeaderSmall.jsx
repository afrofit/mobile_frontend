import * as React from "react";
import styled from "styled-components/native";

import { COLORS } from "../../theme/colors";
import { DEVICE_WIDTH } from "../../theme/globals";
import SquiglyFloater from "../SquiglyFloater";

const TitleText = styled.Text`
	font-family: "Bold";
	font-size: 12px;
	letter-spacing: 3px;
	text-transform: uppercase;
	color: ${COLORS.white};
`;

const Container = styled.View`
	min-height: 7%;
	width: ${DEVICE_WIDTH};
	margin-bottom: 30px;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* background-color: red; */
`;

const PageHeaderSmall = ({ title }) => {
	return (
		<Container>
			<TitleText>{title}</TitleText>
			<SquiglyFloater width={120} top="-15" />
		</Container>
	);
};

export default PageHeaderSmall;
