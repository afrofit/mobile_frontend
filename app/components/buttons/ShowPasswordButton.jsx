import * as React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

const Touchable = styled.Pressable`
	margin: 10px;
`;

const ShowPasswordButton = ({
	onPress,
	showPassword = false,
	color = COLORS.grayDarker,
}) => {
	return (
		<>
			<Touchable onPress={onPress}>
				{showPassword && <Ionicons name="eye" size={20} color={color} />}
				{!showPassword && <Ionicons name="eye-off" size={20} color={color} />}
			</Touchable>
		</>
	);
};

export default ShowPasswordButton;
