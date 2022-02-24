import * as React from "react";
import * as Yup from "yup";
import styled from "styled-components/native";

import { Keyboard } from "react-native";

import AlertModal from "../../../components/modals/AlertModal";
import AuthScreensHeader from "../../../components/AuthScreensHeader";
import Button from "../../../components/buttons/Button";
import ClearButton from "../../../components/buttons/ClearButton";
import Form from "../../../components/form/Form";
import Loader from "../../../components/Loader";
import NumberInputField from "../../../components/form/fields/NumberInputField";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

import { COLORS } from "../../../theme/colors";
import { getConfirmPasswordResetCodeSuccess } from "../../../store/reducers/userReducer";
import { hideGenericErrorDialog } from "../../../store/reducers/uiReducer";
import { ImageBackground } from "../../../components/ImageBackground";
import {
	passwordResetCodeVerify,
	resendEmailVerifyResetCode,
	resendUserVerificationCode,
} from "../../../store/thunks/userReducerThunks";
import { useDispatch, useSelector } from "react-redux";

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
	const [showCodeSuccessModal, setShowCodeSuccessModal] = React.useState(false);
	const [showResendCodeSuccessModal, setShowResendCodeSuccessModal] =
		React.useState(false);

	const dispatch = useDispatch();

	const confirmResetPasswordCodeStatus = useSelector(
		getConfirmPasswordResetCodeSuccess
	);

	React.useEffect(() => {
		if (confirmResetPasswordCodeStatus) {
			triggerSuccess();
		}
	}, [confirmResetPasswordCodeStatus]);

	const handleVerifyEmailedCode = async (data, { resetForm }) => {
		Keyboard.dismiss();
		const { code } = data;
		dispatch(passwordResetCodeVerify(+code));
		resetForm();
		return setShowCodeSuccessModal(true);
	};

	const handleResendEmailVerifyCode = async () => {
		dispatch(resendEmailVerifyResetCode(email));
		return setShowResendCodeSuccessModal(true);
	};

	const triggerSuccess = () => {
		setShowCodeSuccessModal(false);
		return switchStage(stages.RESET);
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
				{/* <FormErrorMessage error={error} /> */}
				<AuthScreensHeader title="Verify Reset Code" />
				<AuthBodyContainer>
					<Form
						initialValues={initialValues}
						onSubmit={handleVerifyEmailedCode}
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
									onDismissError={() => dispatch(hideGenericErrorDialog())}
								/>

								<Spacer h="20px" />

								<ClearButton
									variant="white"
									text="Resend Verification Code"
									onPress={handleResendEmailVerifyCode}
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
