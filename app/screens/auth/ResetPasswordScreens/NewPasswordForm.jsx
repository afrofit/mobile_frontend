import * as React from "react";
import * as Yup from "yup";
import styled from "styled-components/native";

import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import authApi from "../../../api/auth/authApi";
import AuthScreensHeader from "../../../components/AuthScreensHeader";
import Button from "../../../components/buttons/Button";
import ClearButton from "../../../components/buttons/ClearButton";
import Form from "../../../components/form/Form";
import PasswordInputField from "../../../components/form/fields/PasswordInputField";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import useApi from "../../../hooks/useApi";
import useAuth from "../../../hooks/useAuth";

import { COLORS } from "../../../theme/colors";
import { hideGenericErrorDialog } from "../../../store/reducers/uiReducer";
import { ImageBackground } from "../../../components/ImageBackground";
import {
	getChangePasswordSuccess,
	setChangePasswordSuccess,
} from "../../../store/reducers/userReducer";
import { changeUserPassword } from "../../../store/thunks/userReducerThunks";

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
	const dispatch = useDispatch();

	const passwordChangeStatus = useSelector(getChangePasswordSuccess);

	React.useEffect(() => {
		if (passwordChangeStatus) {
			triggerSuccess();
		}
	}, [passwordChangeStatus]);

	const handleSetNewPassword = async (data, { resetForm }) => {
		Keyboard.dismiss();
		const { password } = data;
		dispatch(changeUserPassword(password));
		resetForm();
	};

	const triggerSuccess = () => {
		navigation.navigate(routes.notifications.SUCCESS_PASSWORD_CHANGE, {
			message: "You've successfully changed your password!",
			instruction: "Tap continue to log in",
		});
	};

	return (
		<>
			<ScreenContainer
				backgroundColor={COLORS.black}
				onPress={() => Keyboard.dismiss()}
			>
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
									onDismissError={() => dispatch(hideGenericErrorDialog())}
								/>
								<PasswordInputField
									autoCapitalize="none"
									label="Confirm Password"
									name="confirm-password"
									textContentType="password"
									maxLength={25}
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

export default NewPasswordForm;
