import * as React from "react";
import styled from "styled-components/native";
import { Keyboard } from "react-native";
import * as Yup from "yup";

import authApi from "../../api/auth/authApi";
import Button from "../../components/buttons/Button";
import CheckBoxField from "../../components/form/fields/CheckBoxField";
import ClearButton from "../../components/buttons/ClearButton";
import { COLORS } from "../../theme/colors";
import Form from "../../components/form/Form";
import FormErrorMessage from "../../components/form/fields/FormErrorMessage";
import { ImageBackground } from "../../components/ImageBackground";
import PasswordInputField from "../../components/form/fields/PasswordInputField";
import routes from "../../theme/routes";
import ScreenContainer from "../../utilities/ScreenContainer";
import Spacer from "../../utilities/Spacer";
import TextInputField from "../../components/form/fields/TextInputField";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import Loader from "../../components/Loader";
import AuthScreensHeader from "../../components/AuthScreensHeader";

const initialValues = {
	username: "olasupoodebiyi",
	email: "olasupoodebiyi@yahoo.com",
	password: "olasupoo",
	agreements: true,
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
	// All useState Stuff setup here
	const [error, setError] = React.useState();

	// Create Account API flow here
	const { createAccount } = useAuth();
	const createAccountApi = useApi(authApi.createAccount);

	const handleCreateAccount = async (userData, { resetForm }) => {
		Keyboard.dismiss();
		const { username, email, password } = userData;
		const result = await createAccountApi.request(email, password, username);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		resetForm();
		return triggerSignupSuccess(result.data);
	};

	const triggerSignupSuccess = (data) => {
		navigation.navigate(routes.notifications.SUCCESS_SIGNUP, {
			data,
			func: createAccount,
			onwardRoute: "",
			message:
				"We've sent a 6-digit verification code to the email you provided.",
			succeed: true,
			instruction: "Tap continue when you've got it",
		});
	};

	return (
		<>
			<Loader
				visible={createAccountApi.loading}
				message="Creating Your Account"
			/>
			<ScreenContainer
				backgroundColor={COLORS.black}
				onPress={() => Keyboard.dismiss()}
			>
				<FormErrorMessage error={error} />
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
									onDismissError={() => setError(null)}
								/>
								<TextInputField
									autoCapitalize="none"
									label="Email"
									name="email"
									keyboardType="email-address"
									textContentType="emailAddress"
									onDismissError={() => setError(null)}
								/>
								<PasswordInputField
									autoCapitalize="none"
									label="Password"
									name="password"
									textContentType="password"
									maxLength={25}
									onDismissError={() => setError(null)}
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
