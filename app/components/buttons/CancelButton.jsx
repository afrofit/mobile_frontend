import * as React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";

const Touchable = styled.Pressable`
	position: absolute;
	left: 80%;
`;

const CancelButton = ({ color = COLORS.white, onPress }) => {
	return (
		<Touchable onPress={onPress}>
			<AntDesign name="closecircle" size={20} color={color} />
		</Touchable>
	);
};

export default CancelButton;
