import * as React from "react";
import styled from "styled-components/native";
import * as Yup from "yup";

import { Keyboard } from "react-native";

import AuthScreensHeader from "../../components/AuthScreensHeader";
import Button from "../../components/buttons/Button";
import CheckBoxField from "../../components/form/fields/CheckBoxField";
import ClearButton from "../../components/buttons/ClearButton";
import Form from "../../components/form/Form";
import PasswordInputField from "../../components/form/fields/PasswordInputField";
import routes from "../../theme/routes";
import ScreenContainer from "../../utilities/ScreenContainer";
import Spacer from "../../utilities/Spacer";
import TextInputField from "../../components/form/fields/TextInputField";

import { COLORS } from "../../theme/colors";
import { createAccount } from "../../store/thunks/userReducerThunks";
import { ImageBackground } from "../../components/ImageBackground";
import { useDispatch, useSelector } from "react-redux";
import { hideGenericErrorDialog } from "../../store/reducers/uiReducer";
import { getSignupSuccess } from "../../store/reducers/userReducer";

const initialValues = {
	username: "",
	email: "",
	password: "",
	agreements: false,
};

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.required("Your username is important.")
		.label("Username")
		.min(6, "Must be longer than 6 characters"),
	email: Yup.string()
		.required("Your email is important.")
		.email("That's not a valid email address.")
		.label("Email"),
	password: Yup.string()
		.min(7, "Must be longer than 7 characters.")
		.required()
		.label("Password"),
	agreements: Yup.boolean()
		.required("Agree to proceed.")
		.oneOf([true], "Tap agree to proceed.")
		.label("Agree"),
});

const AuthBodyContainer = styled.View`
	flex: 0.7;
	width: 100%;
	align-items: center;
	padding: 25px;
	padding-top: 5px;
`;

const SignupScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const signupStatus = useSelector(getSignupSuccess);

	React.useEffect(() => {
		if (signupStatus) {
			return triggerSignupSuccess();
		}
	}, [signupStatus]);

	const handleCreateAccount = React.useCallback(
		async (userData, { resetForm }) => {
			Keyboard.dismiss();
			const { email, password, username } = userData;
			dispatch(createAccount(email, password, username));
			resetForm();
		},
		[signupStatus]
	);

	const triggerSignupSuccess = () => {
		navigation.navigate(routes.notifications.SUCCESS_SIGNUP, {
			message:
				"We've sent a 6-digit verification code to the email you provided.",
			instruction: "Tap continue when you've got it",
		});
	};

	return (
		<>
			<ScreenContainer
				backgroundColor={COLORS.black}
				onPress={() => Keyboard.dismiss()}
			>
				<AuthScreensHeader title="Create Account" />

				<AuthBodyContainer>
					<Form
						initialValues={initialValues}
						onSubmit={handleCreateAccount}
						validationSchema={validationSchema}
						// isInitialValid={false}
						initialTouched={{
							username: false,
							email: false,
							agreements: false,
							password: false,
						}}
						// validateOnMount
					>
						{({ handleSubmit, isSubmitting, isValid, dirty }) => (
							<>
								<TextInputField
									autoCapitalize="none"
									label="Username"
									name="username"
									maxLength={25}
									onDismissError={() => dispatch(hideGenericErrorDialog())}
								/>
								<TextInputField
									autoCapitalize="none"
									label="Email"
									name="email"
									keyboardType="email-address"
									textContentType="emailAddress"
									onDismissError={() => dispatch(hideGenericErrorDialog())}
								/>
								<PasswordInputField
									autoCapitalize="none"
									label="Password"
									name="password"
									textContentType="password"
									maxLength={25}
									onDismissError={() => dispatch(hideGenericErrorDialog())}
								/>
								{/* <Spacer /> */}
								<CheckBoxField
									name="agreements"
									onPressText={() =>
										console.log(
											"Will show agreements page when clicked! Ug Girl"
										)
									}
									onPressCheck={() => console.log("Check Pressed!")}
								/>
								<Spacer h="10px" />
								<ClearButton
									variant="white"
									text="Already have an account?"
									onPress={() => navigation.navigate(routes.auth.LOGIN)}
								/>
								<Spacer h="10px" />
								<Button
									text="Create Account"
									onPress={handleSubmit}
									disabled={!(isValid && dirty)}
									variant="red"
								/>
							</>
						)}
					</Form>
				</AuthBodyContainer>
				<ImageBackground height="150" imageType="maleModel" />
			</ScreenContainer>
		</>
	);
};

export default SignupScreen;
