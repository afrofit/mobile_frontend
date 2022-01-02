import * as React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";

const Touchable = styled.Pressable``;

const QuitButton = ({ color = COLORS.white, onPress }) => {
	return (
		<Touchable onPress={onPress}>
			<AntDesign name="closecircle" size={50} color={color} />
		</Touchable>
	);
};

export default QuitButton;
