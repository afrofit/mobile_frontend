import * as React from "react";
import styled from "styled-components/native";

import Font from "../elements/Font";
import { COLORS } from "../theme/colors";
import SquiglyFloater from "./SquiglyFloater";

const AuthHeaderContainer = styled.View`
	height: 80px;
	justify-content: center;
	align-items: center;
`;

const AuthScreensHeader = ({ title = "Screen Title" }) => {
	return (
		<AuthHeaderContainer>
			<Font variant="auth-title" color={COLORS.white}>
				{title}
			</Font>
			<SquiglyFloater width="120" top="0" />
		</AuthHeaderContainer>
	);
};

export default AuthScreensHeader;
