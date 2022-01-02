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

const ConfirmModal = ({
	message = "Are you sure?",
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
				<PageHeaderSmall title={message} />
				<Button
					text="Yes, quit"
					variant="red"
					onPress={() => handleConfirm()}
				/>
				<Button
					text="No, continue"
					variant="white"
					onPress={() => handleCancel()}
				/>
			</ModalBG>
		</BackgroundOverlay>
	);
};

export default ConfirmModal;
