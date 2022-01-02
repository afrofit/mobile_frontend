import * as React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../theme/colors";
import { BORDER_RADIUS_BIG } from "../../theme/globals";

const TouchableButton = styled.Pressable`
	overflow: hidden;
	border-radius: ${BORDER_RADIUS_BIG};
	width: 300px;
	height: 50px;
	margin-bottom: 10px;
	margin-top: 10px;
`;

const DisabledButtonBackground = styled.View`
	background-color: ${COLORS.grayDarker};
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const ButtonBackground = styled.View`
	background-color: ${(props) =>
		props.variant == "red" ? COLORS.red : COLORS.white};
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const ButtonText = styled.Text`
	color: ${(props) => (props.variant == "red" ? COLORS.white : COLORS.black)};
	font-size: 16px;
	letter-spacing: 1px;
	text-transform: uppercase;
	font-family: "Bold";
`;

const DisabledButtonText = styled.Text`
	color: ${COLORS.grayDark};
	font-size: 16px;
	letter-spacing: 1px;
	text-transform: uppercase;
	font-family: "Bold";
`;

const Button = ({ text = "Button", onPress, variant, disabled = false }) => {
	return !disabled ? (
		<TouchableButton onPress={onPress} disabled={disabled}>
			<ButtonBackground variant={variant}>
				<ButtonText variant={variant}>{text}</ButtonText>
			</ButtonBackground>
		</TouchableButton>
	) : (
		<TouchableButton onPress={onPress} disabled={disabled}>
			<DisabledButtonBackground>
				<DisabledButtonText>{text}</DisabledButtonText>
			</DisabledButtonBackground>
		</TouchableButton>
	);
};

export default Button;
