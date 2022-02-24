import * as React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useFocusEffect } from "@react-navigation/native";

import AlertModal from "../../components/modals/AlertModal";
import AuthScreensHeader from "../../components/AuthScreensHeader";
import Button from "../../components/buttons/Button";
import ClearButton from "../../components/buttons/ClearButton";
import { COLORS } from "../../theme/colors";
import Form from "../../components/form/Form";
import { ImageBackground } from "../../components/ImageBackground";
import NumberInputField from "../../components/form/fields/NumberInputField";
import routes from "../../theme/routes";
import Spacer from "../../utilities/Spacer";
import ScreenContainer from "../../utilities/ScreenContainer";
import useDisableHardwareBack from "../../hooks/useDisableHardwareBack";
import { useDispatch, useSelector } from "react-redux";
import { getVerifySuccess } from "../../store/reducers/userReducer";
import { hideGenericErrorDialog } from "../../store/reducers/uiReducer";
import {
	resendUserVerificationCode,
	verifyUserCode,
} from "../../store/thunks/userReducerThunks";

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
	// const [error, setError] = React.useState(null);
	const [showSuccessModal, setShowSuccessModal] = React.useState(false);

	/** Dispatches */
	const dispatch = useDispatch();

	const verifyStatus = useSelector(getVerifySuccess);

	React.useEffect(() => {
		if (verifyStatus) {
			return triggerVerifySuccess();
		}
	}, [verifyStatus]);

	/** Disable Back Button */
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	const handleVerifyEmailCode = async (data, { resetForm }) => {
		Keyboard.dismiss();
		dispatch(verifyUserCode(+data.code));
		resetForm();
	};

	const triggerVerifySuccess = () => {
		navigation.navigate(routes.notifications.SUCCESS_VERIFY, {
			message:
				"We've sent a 6-digit verification code to the email you provided.",
			instruction: "Tap continue when you've got it",
		});
	};

	const handleResendCode = async () => {
		dispatch(resendUserVerificationCode());

		return setShowSuccessModal(true);
	};

	return (
		<>
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
				{/* <FormErrorMessage error={error} /> */}
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
									onDismissError={() => dispatch(hideGenericErrorDialog())}
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
