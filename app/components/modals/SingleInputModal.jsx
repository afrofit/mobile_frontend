import * as React from "react";
import * as Yup from "yup";
import styled from "styled-components/native";

import { Keyboard } from "react-native";

import authFuncs from "../../store/thunks/auth_functions";
import Button from "../buttons/Button";
import ClearButton from "../buttons/ClearButton";
import Form from "../form/Form";
import PageHeaderSmall from "../headers/PageHeaderSmall";
import Spacer from "../../utilities/Spacer";
import TextInputField from "../form/fields/TextInputField";

import { BackgroundOverlay } from "../BackgroundOverlay";
import { BORDER_RADIUS_MID } from "../../theme/globals";
import { COLORS } from "../../theme/colors";
import { getCurrentUserToken } from "../../store/reducers/userReducer";
import { hideGenericErrorDialog } from "../../store/reducers/uiReducer";
import { useDispatch, useSelector } from "react-redux";

const initialValues = {
	username: "paddy_manchy",
};

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.required("Your username is important.")
		.label("Username")
		.min(6, "Must be longer than 6 characters"),
});

const ModalBG = styled.ImageBackground`
	resize-mode: contain;
	justify-content: center;
	align-items: center;
	min-height: 20px;
	width: 90%;
	border-radius: ${BORDER_RADIUS_MID};
	overflow: hidden;
	padding: 20px;
	background-color: ${COLORS.black};
`;

const SingleInputModal = ({ onCancelChange }) => {
	const dispatch = useDispatch();

	const currentUserToken = useSelector(getCurrentUserToken);

	React.useEffect(() => {
		if (currentUserToken) {
			triggerSuccess();
			dismissModal();
		}
	}, [currentUserToken]);

	const handleChangeUsername = async (userData, { resetForm }) => {
		Keyboard.dismiss();
		const { username } = userData;
		dispatch(changeUsername(username));
		resetForm();
	};

	const triggerSuccess = () => {
		authFuncs.updateUserInStore(dispatch, currentUserToken);
	};

	const dismissModal = () => {
		onCancelChange();
	};

	return (
		<BackgroundOverlay>
			<ModalBG>
				<PageHeaderSmall title={message} />

				<Form
					initialValues={initialValues}
					onSubmit={handleChangeUsername}
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
								label="Enter new username"
								name="username"
								onDismissError={() => dispatch(hideGenericErrorDialog())}
							/>
							<Spacer />

							<Button
								text={isSubmitting ? "Changing Username" : "Change Username"}
								onPress={handleSubmit}
								disabled={!(isValid && dirty)}
								variant="red"
							/>
							<Spacer h="10px" />
							<ClearButton
								variant="white"
								text="Cancel Change"
								onPress={() => dismissModal()}
							/>
						</>
					)}
				</Form>
			</ModalBG>
		</BackgroundOverlay>
	);
};

export default SingleInputModal;
