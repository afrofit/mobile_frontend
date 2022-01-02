import * as React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../theme/colors";

const variants = {
	white: COLORS.white,
	gray: COLORS.grayDark,
	yellow: COLORS.yellow,
};

const Touchable = styled.Pressable``;

const Text = styled.Text`
	color: ${(props) => props.color};
	font-size: 13px;
	font-family: "SemiBold;
    padding: 5px;
`;

const ClearButton = ({ text = "Clear Button", variant = "white", onPress }) => {
	const textColor = variants[variant];
	return (
		<Touchable onPress={onPress}>
			<Text color={textColor}>{text}</Text>
		</Touchable>
	);
};

export default ClearButton;
