import * as React from "react";
import styled from "styled-components/native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../theme/globals";

const Container = styled.View`
	align-items: center;
	height: ${DEVICE_HEIGHT};
	width: ${DEVICE_WIDTH};
	position: absolute;
	z-index: -2;
`;

const VideoContainer = ({ children }) => {
	return <Container>{children}</Container>;
};

export default VideoContainer;
