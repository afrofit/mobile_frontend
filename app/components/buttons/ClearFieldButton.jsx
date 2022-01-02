import * as React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";

const Touchable = styled.Pressable`
	margin: 10px;
`;

const ClearFieldButton = ({ onPress, color = COLORS.grayDarker }) => {
	return (
		<>
			<Touchable onPress={onPress}>
				<MaterialIcons name="cancel" size={20} color={color} />
			</Touchable>
		</>
	);
};

export default ClearFieldButton;
