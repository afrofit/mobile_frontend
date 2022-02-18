import * as React from "react";
import styled from "styled-components/native";
import Font from "../../elements/Font";
import { COLORS } from "../../theme/colors";
import {
	BORDER_RADIUS_MID,
	BORDER_RADIUS_SMALL,
	MARGIN_VERTICAL,
} from "../../theme/globals";
import { calculatePercentageCompleted } from "../../utilities/calculators";
import Spacer from "../../utilities/Spacer";

//ImageBG
const Background = styled.ImageBackground`
	resize-mode: contain;
	height: 150px;
	width: 100%;
	margin-bottom: ${MARGIN_VERTICAL};
	border-radius: ${BORDER_RADIUS_MID};
	overflow: hidden;
	padding: 15px;
	align-items: flex-end;
	justify-content: space-between;
`;

const StatusTag = styled.View`
	padding-left: 5px;
	padding-right: 5px;
	padding-top: 2px;
	padding-bottom: 2px;
	border-radius: ${BORDER_RADIUS_SMALL};
	background-color: ${COLORS.white};
`;

const TitleContainer = styled.View`
	background-color: ${COLORS.black};
	padding: 5px;
	padding-left: 10px;
	padding-right: 10px;
`;

const Touchable = styled.Pressable``;

const StoryCard = ({
	storyTitle,
	completed,
	started,
	onPress,
	source,
	totalTargetBodyMoves,
	totalBodyMoves,
}) => {
	// const message =
	// 	started && completed
	// 		? "Completed"
	// 		: started && !completed
	// 		? "Started"
	// 		: "Fresh";
	const generateMessage = () => {
		if (started && completed) return "Completed";
		else if (started && !completed) return `${calcPercent}% completed`;
		else if (!started) return "Fresh";
	};

	const calcPercent = React.useCallback(
		calculatePercentageCompleted(totalBodyMoves, totalTargetBodyMoves),
		[totalBodyMoves, totalTargetBodyMoves]
	);

	const message = React.useCallback(generateMessage(), [
		totalBodyMoves,
		totalTargetBodyMoves,
	]);

	return (
		<Touchable onPress={onPress}>
			<Background source={{ uri: source }}>
				<StatusTag>
					<Font variant="small-caps" color={COLORS.grayDarker}>
						{message}
					</Font>
				</StatusTag>
				<TitleContainer>
					<Font variant="big-caps" color={COLORS.yellow}>
						{storyTitle}
					</Font>
				</TitleContainer>
			</Background>
		</Touchable>
	);
};

export default StoryCard;
