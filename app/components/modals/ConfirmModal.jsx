import * as React from "react";
import AnimatedLottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import { BackgroundOverlay } from "../BackgroundOverlay";
import { BORDER_RADIUS_MID } from "../../theme/globals";
import { COLORS } from "../../theme/colors";
import Font from "../../elements/Font";
import PageHeaderSmall from "../headers/PageHeaderSmall";
import Button from "../buttons/Button";

const ModalBG = styled.ImageBackground`
	resize-mode: contain;
	justify-content: center;
	align-items: center;
	min-height: 20px;
	width: 90%;
	border-radius: ${BORDER_RADIUS_MID};
	overflow: hidden;
	padding: 30px;
	background-color: ${COLORS.black};
`;

const ParagraphText = styled.Text`
	font-family: "Regular";
	font-size: 15px;
	letter-spacing: 0.1px;
	color: ${COLORS.grayDark};
	/* width: 40%; */
	/* text-transform: lowercase; */
	text-align: center;
	margin-bottom: 20px;
`;

const ConfirmModal = ({
	title = "Are you sure?",
	confirmText = "Yes",
	cancelText = "No",
	message,
	onCancelClicked,
	onConfirmClicked,
}) => {
	const handleConfirm = () => {
		onConfirmClicked();
	};

	const handleCancel = () => {
		onCancelClicked();
	};
	return (
		<BackgroundOverlay>
			<ModalBG>
				<PageHeaderSmall title={title} />
				{message && <ParagraphText>{message}</ParagraphText>}
				<Button
					text={confirmText}
					variant="red"
					onPress={() => handleConfirm()}
				/>
				<Button
					text={cancelText}
					variant="white"
					onPress={() => handleCancel()}
				/>
			</ModalBG>
		</BackgroundOverlay>
	);
};

export default ConfirmModal;
