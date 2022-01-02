import * as React from "react";
import styled from "styled-components/native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../theme/globals";

export const ContentContainer = styled.View`
	width: ${DEVICE_WIDTH}
	flex: 1;
	align-items: center;
	padding: 10px;
`;
