import * as React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useFocusEffect } from "@react-navigation/native";

import AlertModal from "../../components/modals/AlertModal";
import authApi from "../../api/auth/authApi";
import AuthScreensHeader from "../../components/AuthScreensHeader";
import Button from "../../components/buttons/Button";
import ClearButton from "../../components/buttons/ClearButton";
import { COLORS } from "../../theme/colors";
import Form from "../../components/form/Form";
import FormErrorMessage from "../../components/form/fields/FormErrorMessage";
import { ImageBackground } from "../../components/ImageBackground";
import Loader from "../../components/Loader";
import NumberInputField from "../../components/form/fields/NumberInputField";
import routes from "../../theme/routes";
import Spacer from "../../utilities/Spacer";
import ScreenContainer from "../../utilities/ScreenContainer";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import useDisableHardwareBack from "../../hooks/useDisableHardwareBack";

const initialValues = {
	code: "",
};

const validationSchema = Yup.object().shape({
	code: Yup.string().required().min(6, "Code must be 6 digits").max(6),
});

const AuthBodyContainer = styled.View`
	flex: 0.7;
	width: 100%;
	align-items: center;
	padding: 25px;
	padding-top: 5px;
`;

const VerifyCodeScreen = ({ navigation }) => {
	// All useState Stuff setup here
	const [error, setError] = React.useState(null);
	const [showSuccessModal, setShowSuccessModal] = React.useState(false);

	// Disable Back Button
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	// Create Account API flow here
	const { verifyUser } = useAuth();

	const verifyCodeApi = useApi(authApi.verifySignupCode);
	const resendVerificationCodeApi = useApi(
		authApi.resendSignupVerificationCode
	);

	const handleVerifyEmailCode = async (data, { resetForm }) => {
		Keyboard.dismiss();
		const result = await verifyCodeApi.request(+data.code);

		if (!result.ok) {
			if (result.data) setError(result.data);
			else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		resetForm();
		return triggerVerifySuccess(result.data);
	};

	const triggerVerifySuccess = (data) => {
		navigation.navigate(routes.notifications.SUCCESS_VERIFY, {
			data,
			func: verifyUser,
			onwardRoute: "",
			message: "You've been verified!",
			succeed: true,
			instruction:
				"Tap start when you're ready to build your fitness and find your rhythm",
		});
	};

	const handleResendCode = async () => {
		const result = await resendVerificationCodeApi.request();

		if (!result.ok) {
			if (result.data) returnsetError("Could not send a new code. Retry?");
			else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		return setShowSuccessModal(true);
	};

	return (
		<>
			<Loader
				// visible={true}
				visible={verifyCodeApi.loading || resendVerificationCodeApi.loading}
				message="Creating Your Account"
			/>
			{showSuccessModal && (
				<AlertModal
					message="Check your email."
					onAnimationDone={() => setShowSuccessModal(false)}
				/>
			)}
			<ScreenContainer
				backgroundColor={COLORS.black}
				onPress={() => Keyboard.dismiss()}
			>
				<FormErrorMessage error={error} />
				<AuthScreensHeader title="Verify Reset Code" />
				<AuthBodyContainer>
					<Form
						initialValues={initialValues}
						onSubmit={handleVerifyEmailCode}
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
								<NumberInputField
									autoCapitalize="none"
									maxLength={6}
									name="code"
									label="Verification code"
									textContentType="emailAddress"
									onDismissError={() => setError(null)}
								/>

								<Spacer h="20px" />

								<ClearButton
									variant="white"
									text="Resend Verification Code"
									onPress={handleResendCode}
								/>
								<Spacer />

								<Button
									text={isSubmitting ? "Submitting" : "Verify Code"}
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

export default VerifyCodeScreen;
