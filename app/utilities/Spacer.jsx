import * as React from "react";
import styled from "styled-components/native";

const SpacerComponent = styled.View`
	min-height: ${(props) => props.h};
`;

const Spacer = ({ h = "20px" }) => {
	return <SpacerComponent h={h} />;
};

export default Spacer;
