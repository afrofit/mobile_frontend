import * as React from "react";
import styled from "styled-components/native";
import { Keyboard } from "react-native";
import * as Yup from "yup";

import authApi from "../../api/auth/authApi";
import Button from "../../components/buttons/Button";
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
	email: "olasupoodebiyi@yahoo.com",
	password: "olasupoo",
};

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required("Your email is important.")
		.email("That's not a valid email address.")
		.label("Email"),
	password: Yup.string()
		.min(7, "Must be longer than 7 characters.")
		.required()
		.label("Password"),
});

const AuthBodyContainer = styled.View`
	flex: 0.7;
	width: 100%;
	align-items: center;
	padding: 25px;
	padding-top: 5px;
`;

const LoginScreen = ({ navigation }) => {
	// All useState Stuff setup here
	const [error, setError] = React.useState();

	// Create Account API flow here
	const { logUserIn } = useAuth();
	const logUserInApi = useApi(authApi.logUserIn);

	const handleLogin = async (userData, { resetForm }) => {
		Keyboard.dismiss();
		const { email, password } = userData;
		const result = await logUserInApi.request(email, password);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		// console.log("Login result", result.data);
		resetForm();
		return logUserIn(result.data);
	};

	return (
		<>
			<Loader
				visible={logUserInApi.loading}
				message="Logging in to your account"
			/>
			<ScreenContainer
				backgroundColor={COLORS.black}
				onPress={() => Keyboard.dismiss()}
			>
				<FormErrorMessage error={error} />
				<AuthScreensHeader title="Log In" />
				<AuthBodyContainer>
					<Form
						initialValues={initialValues}
						onSubmit={handleLogin}
						validationSchema={validationSchema}
						// isInitialValid={false}
						initialTouched={{
							username: false,
							email: false,
							agreements: false,
							password: false,
						}}
					>
						{({ handleSubmit, isSubmitting, isValid, dirty }) => (
							<>
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

								<Spacer h="20px" />
								<ClearButton
									variant="yellow"
									text="Forgot your password?"
									onPress={() =>
										navigation.navigate(routes.auth.RESET_PASSWORD)
									}
								/>
								<Spacer h="20px" />
								<ClearButton
									variant="white"
									text="Create a new account instead"
									onPress={() => navigation.navigate(routes.auth.SIGNUP)}
								/>
								<Spacer h="10px" />
								<Button
									text="Log me in"
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

export default LoginScreen;
