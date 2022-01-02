import * as React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import * as Yup from "yup";

import authApi from "../../../api/auth/authApi";
import AuthScreensHeader from "../../../components/AuthScreensHeader";
import Button from "../../../components/buttons/Button";
import ClearButton from "../../../components/buttons/ClearButton";
import FormErrorMessage from "../../../components/form/fields/FormErrorMessage";
import NumberInputField from "../../../components/form/fields/NumberInputField";
import Form from "../../../components/form/Form";
import { ImageBackground } from "../../../components/ImageBackground";
import Loader from "../../../components/Loader";
import AlertModal from "../../../components/modals/AlertModal";
import useApi from "../../../hooks/useApi";
import useAuth from "../../../hooks/useAuth";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

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

const VerifyCodeForm = ({ switchStage, stages, navigation, email }) => {
	// All useState Stuff setup here
	const [error, setError] = React.useState(null);
	const [showCodeSuccessModal, setShowCodeSuccessModal] = React.useState(false);
	const [showResendCodeSuccessModal, setShowResendCodeSuccessModal] =
		React.useState(false);

	// Create Account API flow here
	const { reactivateUser } = useAuth();
	const verifyPasswordResetCodeApi = useApi(authApi.verifyPasswordResetCode);
	const resendPasswordVerifyCodeApi = useApi(
		authApi.resendResetPasswordVerifyCode
	);

	const handleVerifyEmailCode = async (data, { resetForm }) => {
		Keyboard.dismiss();
		const result = await verifyPasswordResetCodeApi.request(+data.code);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}

		reactivateUser(result.data);
		resetForm();
		return setShowCodeSuccessModal(true);
	};

	const triggerSuccess = () => {
		setShowCodeSuccessModal(false);
		return switchStage(stages.RESET);
	};

	const handleResendCode = async () => {
		const result = await resendPasswordVerifyCodeApi.request(email);

		if (!result.ok) {
			if (result.data) setError("Could not send a new code. Retry?");
			else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		return setShowResendCodeSuccessModal(true);
	};

	return (
		<>
			<Loader visible={false} message="Creating Your Account" />
			{showCodeSuccessModal && (
				<AlertModal
					message="Check your email."
					onAnimationDone={triggerSuccess}
				/>
			)}
			{showResendCodeSuccessModal && (
				<AlertModal
					message="Code resent to your email."
					onAnimationDone={() => setShowResendCodeSuccessModal(false)}
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
									keyboardType="email-address"
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
								<ClearButton
									variant="yellow"
									text="Log in instead?"
									onPress={() => navigation.navigate(routes.auth.LOGIN)}
								/>
								<Spacer h="10px" />

								<Button
									text="Verify Code"
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

export default VerifyCodeForm;
