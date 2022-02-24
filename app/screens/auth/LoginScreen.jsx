import * as React from "react";
import styled from "styled-components/native";
import { Keyboard } from "react-native";
import * as Yup from "yup";

import AuthScreensHeader from "../../components/AuthScreensHeader";
import Button from "../../components/buttons/Button";
import ClearButton from "../../components/buttons/ClearButton";
import Form from "../../components/form/Form";
import PasswordInputField from "../../components/form/fields/PasswordInputField";
import routes from "../../theme/routes";
import ScreenContainer from "../../utilities/ScreenContainer";
import Spacer from "../../utilities/Spacer";
import TextInputField from "../../components/form/fields/TextInputField";

import { ImageBackground } from "../../components/ImageBackground";
import { COLORS } from "../../theme/colors";
import { logUserIn } from "../../store/thunks/userReducerThunks";
import { useDispatch } from "react-redux";
import { hideGenericErrorDialog } from "../../store/reducers/uiReducer";

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
	const dispatch = useDispatch();

	const handleLogin = async (userData, { resetForm }) => {
		Keyboard.dismiss();
		const { email, password } = userData;
		dispatch(logUserIn(email, password));
		resetForm();
	};

	return (
		<>
			<ScreenContainer
				backgroundColor={COLORS.black}
				onPress={() => Keyboard.dismiss()}
			>
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
