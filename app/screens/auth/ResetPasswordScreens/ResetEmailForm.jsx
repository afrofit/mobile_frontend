import * as React from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import * as Yup from "yup";
import authApi from "../../../api/auth/authApi";

import AuthScreensHeader from "../../../components/AuthScreensHeader";
import Button from "../../../components/buttons/Button";
import ClearButton from "../../../components/buttons/ClearButton";
import FormErrorMessage from "../../../components/form/fields/FormErrorMessage";
import TextInputField from "../../../components/form/fields/TextInputField";
import Form from "../../../components/form/Form";
import { ImageBackground } from "../../../components/ImageBackground";
import Loader from "../../../components/Loader";
import useApi from "../../../hooks/useApi";
import useAuth from "../../../hooks/useAuth";
import { switchStage } from "../../../store/reducers/resetPasswordReducer";
import { hideGenericErrorDialog } from "../../../store/reducers/uiReducer";
import {
	getCurrentUserResetToken,
	getEmailResetSuccess,
} from "../../../store/reducers/userReducer";
import { emailResetCode } from "../../../store/thunks/userReducerThunks";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

const initialValues = {
	email: "olasupoodebiyi@yahoo.co",
};

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required("Email required.")
		.email("Invalid Email.")
		.label("Email"),
});

const AuthBodyContainer = styled.View`
	flex: 0.7;
	width: 100%;
	align-items: center;
	padding: 25px;
	padding-top: 5px;
`;

const ResetEmailForm = ({ stages, navigation, setEmail }) => {
	const dispatch = useDispatch();

	const resetEmailStatus = useSelector(getEmailResetSuccess);

	React.useEffect(() => {
		if (resetEmailStatus) {
			return dispatch(switchStage(stages.VERIFY));
		}
	}, [resetEmailStatus]);

	const handleResetEmail = async (userData, { resetForm }) => {
		Keyboard.dismiss();
		const { email } = userData;
		dispatch(emailResetCode(email));
		resetForm();
		setEmail(email);
	};

	return (
		<>
			<ScreenContainer
				backgroundColor={COLORS.black}
				onPress={() => Keyboard.dismiss()}
			>
				<AuthScreensHeader title="What's your email?" />
				<AuthBodyContainer>
					<Form
						initialValues={initialValues}
						onSubmit={handleResetEmail}
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

								<Spacer h="20px" />

								<ClearButton
									variant="white"
									text="Log in instead"
									onPress={() => navigation.navigate(routes.auth.LOGIN)}
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

export default ResetEmailForm;
