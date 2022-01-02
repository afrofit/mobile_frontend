import * as React from "react";
import styled from "styled-components/native";

import Font from "../../../elements/Font";
import { COLORS } from "../../../theme/colors";

const Container = styled.View`
	background-color: ${COLORS.red};
	padding: 4px;
	margin-top: 5px;
	margin-bottom: 5px;
	position: absolute;
	width: 100%;
	top: -1%;
	z-index: 10;
`;

const FormErrorMessage = ({ error }) => {
	return !error ? null : (
		<Container>
			<Font color={COLORS.white} variant="error">
				{error}
			</Font>
		</Container>
	);
};

export default FormErrorMessage;
