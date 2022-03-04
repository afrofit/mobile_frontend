import * as React from "react";
import styled from "styled-components/native";

import { BORDER_RADIUS_MID, MARGIN_VERTICAL } from "../../theme/globals";
import { COLORS } from "../../theme/colors";
import {
	calculateDanceDuration,
	calculatePercentageCompleted,
} from "../../utilities/calculators";

const Container = styled.Pressable`
	width: 100%;
	margin-bottom: ${MARGIN_VERTICAL};
`;

const Top = styled.View`
	height: 50px;
	background-color: ${COLORS.darker};
	overflow: hidden;
	border-top-right-radius: ${BORDER_RADIUS_MID};
	border-top-left-radius: ${BORDER_RADIUS_MID};
	align-items: center;
	justify-content: center;
`;

const Bottom = styled(Top)`
	background-color: ${(props) => props.color};
	height: 30px;
	border-top-right-radius: 0;
	border-top-left-radius: 0;
	border-bottom-right-radius: ${BORDER_RADIUS_MID};
	border-bottom-left-radius: ${BORDER_RADIUS_MID};
	align-items: flex-end;
	padding-right: 20px;
`;

const StatusFont = styled.Text`
	text-transform: uppercase;
	letter-spacing: 3px;
	font-size: 11px;
	font-family: "Bold";
	color: ${COLORS.darker};
`;
const ChapterFont = styled(StatusFont)`
	/* font-family: "Medium"; */
	font-size: 15px;
	color: ${COLORS.white};
	margin-top: 5px;
	margin-bottom: 5px;
`;

const ChapterCard = ({
	onPress,
	number = 0,
	bodyMoves,
	targetBodyMoves,
	completed,
	started,
	disabled,
}) => {
	return (
		<Container disabled={disabled} onPress={onPress}>
			<Top>
				<ChapterFont>Play Chapter {number}</ChapterFont>
			</Top>
			<BottomPartOfCard
				bodyMoves={bodyMoves}
				targetBodyMoves={targetBodyMoves}
				completed={completed}
				started={started}
			/>
		</Container>
	);
};

const BottomPartOfCard = ({
	bodyMoves,
	targetBodyMoves,
	completed,
	started,
}) => {
	const generateBackgroundColor = React.useCallback(() => {
		if (!started && !completed) return COLORS.yellow;
		else if (started && !completed) return COLORS.bronze;
		else if (started && completed) return COLORS.grayDarker;
	}, [bodyMoves, targetBodyMoves]);

	const PERCENTAGE_COMPLETED = calculatePercentageCompleted(
		bodyMoves,
		targetBodyMoves
	);

	return (
		<>
			<Bottom color={generateBackgroundColor}>
				{started && completed && <StatusFont>Finished</StatusFont>}
				{!started && !completed && <StatusFont>Fresh</StatusFont>}
				{started && !completed && (
					<StatusFont>{`${PERCENTAGE_COMPLETED}% COMPLETE`}</StatusFont>
				)}
			</Bottom>
		</>
	);
};

export default ChapterCard;
