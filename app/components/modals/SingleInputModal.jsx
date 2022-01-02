import * as React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Keyboard } from "react-native";
import * as Yup from "yup";

import { BackgroundOverlay } from "../BackgroundOverlay";
import { BORDER_RADIUS_MID } from "../../theme/globals";
import { COLORS } from "../../theme/colors";
import PageHeaderSmall from "../headers/PageHeaderSmall";
import FormErrorMessage from "../form/fields/FormErrorMessage";
import Form from "../form/Form";
import Spacer from "../../utilities/Spacer";
import TextInputField from "../form/fields/TextInputField";
import Button from "../buttons/Button";
import ClearButton from "../buttons/ClearButton";
import authApi from "../../api/auth/authApi";
import useApi from "../../hooks/useApi";
import Loader from "../Loader";
import useAuth from "../../hooks/useAuth";

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

const SingleInputModal = ({ message = "Success!", onCancelChange }) => {
	const [error, setError] = React.useState();

	// Create Account API flow here
	const { saveNewUsername } = useAuth();
	const changeUsernameApi = useApi(authApi.changeUsername);

	const handleChangeUsername = async (userData, { resetForm }) => {
		Keyboard.dismiss();
		const { username } = userData;
		const result = await changeUsernameApi.request(username);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		console.log("Change Password result", result.data);
		resetForm();
		saveNewUsername(result.data);
		return dismissModal();
	};
	const dismissModal = () => {
		onCancelChange();
	};

	return (
		<BackgroundOverlay>
			<Loader
				visible={changeUsernameApi.loading}
				message="Changing your username"
			/>
			<FormErrorMessage error={error} />
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
								onDismissError={() => setError(null)}
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
