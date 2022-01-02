import * as React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import * as Yup from "yup";
import authApi from "../../../api/auth/authApi";

import AuthScreensHeader from "../../../components/AuthScreensHeader";
import Button from "../../../components/buttons/Button";
import ClearButton from "../../../components/buttons/ClearButton";
import FormErrorMessage from "../../../components/form/fields/FormErrorMessage";
import PasswordInputField from "../../../components/form/fields/PasswordInputField";
import Form from "../../../components/form/Form";
import { ImageBackground } from "../../../components/ImageBackground";
import Loader from "../../../components/Loader";
import useApi from "../../../hooks/useApi";
import useAuth from "../../../hooks/useAuth";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

const initialValues = {
	password: "olasup",
	"confirm-password": "olasup",
};

const validationSchema = Yup.object().shape({
	password: Yup.string()
		.min(7, "Enter a longer password.")
		.required()
		.label("Password"),
	"confirm-password": Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Passwords must match"
	),
});

const AuthBodyContainer = styled.View`
	flex: 0.7;
	width: 100%;
	align-items: center;
	padding: 25px;
	padding-top: 5px;
`;

const NewPasswordForm = ({ navigation }) => {
	// All useState stuff here...
	const [error, setError] = React.useState();

	// Replace passwords flow here
	const { logUserIn } = useAuth();
	const setNewPasswordApi = useApi(authApi.setNewPassword);

	const handleSetNewPassword = async (data, { resetForm }) => {
		Keyboard.dismiss();
		const result = await setNewPasswordApi.request(data.password);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		resetForm();
		return triggerSuccess(result.data);
	};

	const triggerSuccess = (data) => {
		navigation.navigate(routes.notifications.SUCCESS_PASSWORD_CHANGE, {
			data,
			func: logUserIn,
			onwardRoute: "",
			succeed: true,
			message: "You've successfully changed your password!",
			instruction: "Tap continue to log in",
		});
	};

	return (
		<>
			<Loader
				visible={setNewPasswordApi.loading}
				message="Creating Your Account"
			/>

			<ScreenContainer
				backgroundColor={COLORS.black}
				onPress={() => Keyboard.dismiss()}
			>
				<FormErrorMessage error={error} />
				<AuthScreensHeader title="Your new password" />
				<AuthBodyContainer>
					<Form
						initialValues={initialValues}
						onSubmit={handleSetNewPassword}
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
								<PasswordInputField
									autoCapitalize="none"
									label="New Password"
									name="password"
									textContentType="password"
									maxLength={25}
									onDismissError={() => setError(null)}
								/>
								<PasswordInputField
									autoCapitalize="none"
									label="Confirm Password"
									name="confirm-password"
									textContentType="password"
									maxLength={25}
									onDismissError={() => setError(null)}
								/>

								<Spacer h="20px" />

								<ClearButton
									variant="white"
									text="Log in instead"
									onPress={() => navigation.navigate(routes.auth.SIGNUP)}
								/>
								<Spacer h="10px" />
								<Button
									text="Reset password"
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

export default NewPasswordForm;
