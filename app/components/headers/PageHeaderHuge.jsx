import * as React from "react";
import styled from "styled-components/native";

import { COLORS } from "../../theme/colors";
import { DEVICE_WIDTH } from "../../theme/globals";
import SquiglyFloater from "../SquiglyFloater";

const TitleText = styled.Text`
	font-family: "Regular";
	font-size: 40px;
	letter-spacing: 0.56px;
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

const PageHeaderHuge = ({ title = "Fail" }) => {
	return (
		<Container>
			<TitleText>{title}</TitleText>
			<SquiglyFloater width={120} top="3" />
		</Container>
	);
};

export default PageHeaderHuge;
