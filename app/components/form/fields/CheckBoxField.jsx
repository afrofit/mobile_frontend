import * as React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useFormikContext } from "formik";

import { COLORS } from "../../../theme/colors";
import Spacer from "../../../utilities/Spacer";

const CheckBoxElement = styled.View`
	height: 20px;
	width: 20px;
	border-radius: 7px;
	border-color: ${(props) => props.color};
	border-width: 1px;
	justify-content: center;
	align-items: center;
	/* margin-right: 5px; */
`;

const Container = styled.View``;

const CheckText = styled.Text`
	font-size: 12px;
	color: ${COLORS.grayMid};
	font-family: "Regular";
	line-height: 20px;
`;

const BoldText = styled.Text`
	font-size: 12px;
	color: ${COLORS.grayMid};
	font-family: "SemiBold";
	line-height: 20px;
`;

const ErrorText = styled.Text`
	font-size: 12px;
	color: ${COLORS.yellow};
	font-family: "SemiBold";
	line-height: 20px;
`;

const TappableText = styled.Text`
	font-size: 12px;
	color: ${COLORS.yellow};
	font-family: "SemiBold";
	line-height: 20px;
	text-transform: uppercase;
`;

const Field = styled.View`
	flex-direction: row;
	width: 95%;
	justify-content: space-between;
	/* align-items: center; */
`;

const Touchable = styled.Pressable`
	/* width: 15%; */
`;

const TextContainer = styled.View`
	width: 90%;
`;

const CheckBoxField = ({ color = COLORS.white, onPressText, name }) => {
	const {
		setFieldTouched,
		setFieldValue,
		setFieldError,
		errors,
		touched,
		values,
	} = useFormikContext();

	const [checked, setChecked] = React.useState(values[name]);

	const handleCheckPressed = () => {
		setChecked(!checked);
		setFieldValue(name, !checked);
	};

	return (
		<Container>
			<Spacer h="10px" />
			<Field>
				<Touchable onPress={handleCheckPressed}>
					<CheckBoxElement color={color}>
						{checked && (
							<Ionicons name="checkmark-outline" size={18} color={color} />
						)}
					</CheckBoxElement>
				</Touchable>
				<TextContainer>
					<CheckText>
						{errors[name] && <ErrorText>{errors[name]} </ErrorText>}I agree to
						the Afrofit <BoldText>Terms of Service</BoldText>,{" "}
						<BoldText>Membership Terms</BoldText> and{" "}
						<BoldText>Privacy Policy.</BoldText>{" "}
						<TappableText onPress={onPressText}>View Agreements</TappableText>
					</CheckText>
				</TextContainer>
			</Field>
		</Container>
	);
};

export default CheckBoxField;
