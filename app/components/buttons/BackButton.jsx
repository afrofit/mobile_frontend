import * as React from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";

const Touchable = styled.Pressable`
	position: absolute;
	left: ${(props) => (props.left ? `${props.left}px` : 0)};
	top: ${(props) => (props.top ? `${props.top}px` : 0)};
`;

const BackButton = ({ color = COLORS.white, onPress, left, top }) => {
	return (
		<Touchable hitSlop={25} onPress={onPress} left={left} top={top}>
			<FontAwesome5 name="arrow-circle-left" size={20} color={color} />
		</Touchable>
	);
};

export default BackButton;
