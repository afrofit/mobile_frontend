import * as React from "react";
import styled from "styled-components/native";

import { useFormikContext } from "formik";
import { COLORS } from "../../../theme/colors";
import { BORDER_RADIUS_SMALL } from "../../../theme/globals";
import ClearFieldButton from "../../buttons/ClearFieldButton";

const Field = styled.View`
	height: 50px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	border-bottom-width: 1px;
	margin-bottom: 10px;
	border-bottom-color: ${COLORS.yellow};
`;

const Input = styled.TextInput`
	flex: 1;
	color: ${COLORS.white};
	font-family: "Regular";
	font-size: 14px;
	height: 70%;
	padding-left: 20px;
	align-self: flex-end;
`;

const LabelText = styled.Text`
	font-size: 11px;
	color: ${(props) => (!props.error ? COLORS.grayDark : COLORS.yellow)};
	font-family: "Medium";
	margin-left: 15px;
	position: absolute;
	letter-spacing: 0.1px;
	top: 10%;
	left: 0px;
	z-index: 100;
`;

const TextInputField = ({
	label = "Username",
	name = "Put Field Label",
	onPress,
	onDismissError,
	...otherProps
}) => {
	const {
		setFieldTouched,
		setFieldValue,
		setFieldError,
		errors,
		touched,
		values,
	} = useFormikContext();

	const dismissError = () => {
		onDismissError();
		setFieldError(name, "");
	};

	return (
		<Field>
			<LabelText error={errors[name]}>{errors[name] || label}</LabelText>
			<Input
				onBlur={() => setFieldTouched(name)}
				onChangeText={(text) => setFieldValue(name, text)}
				onFocus={dismissError}
				selectionColor={COLORS.white}
				value={values[name]}
				{...otherProps}
			/>
			<ClearFieldButton onPress={() => setFieldValue(name, "")} />
		</Field>
	);
};

export default TextInputField;
