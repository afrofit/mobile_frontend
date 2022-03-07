import * as React from "react";
import styled from "styled-components/native";

import { StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import MarathonLeagueCard from "../../../components/cards/MarathonLeagueCard";
import PageHeaderLarge from "../../../components/headers/PageHeaderLarge";
import PromotionNotifyCard from "../../../components/cards/PromotionNotifyCard";
import RankingCard from "../../../components/cards/RankingCard";
import ScreenContainer from "../../../utilities/ScreenContainer";

import { COLORS } from "../../../theme/colors";
import { ContentContainer } from "../../../components/ContentContainer";
import { rangeFunction } from "../../../utilities/range";
import { ranks } from "../../../data/rank-data";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarathonData } from "../../../store/thunks/marathonThunks";
import {
	getTopPerformers,
	getUserMarathonScore,
} from "../../../store/reducers/marathonReducer";
import { getCurrentUser } from "../../../store/reducers/userReducer";

const Scroller = styled.ScrollView`
	max-height: 100%;
	width: 100%;
`;

const MarathonScreen = ({}) => {
	const [visibleRank, setVisibleRank] = React.useState(2);

	const dispatch = useDispatch();

	/** Selectors */

	const userMarathonScore = useSelector(getUserMarathonScore);
	const topPerformersArray = useSelector(getTopPerformers);
	const currentUser = useSelector(getCurrentUser);

	const getData = () => {
		dispatch(fetchMarathonData());
	};

	useFocusEffect(
		React.useCallback(() => {
			getData();

			return () => {};
		}, [])
	);

	React.useEffect(() => {
		checkCurrentUserPosition();
	}, [visibleRank]);

	const findUserIndex = () => {
		if (!userMarathonScore || !topPerformersArray || !topPerformersArray.length)
			return null;

		let currentUserMarathonScoreIndex;

		for (const [index, score] of topPerformersArray.entries()) {
			if (score.id === userMarathonScore.id) {
				currentUserMarathonScoreIndex = index;
				break;
			}
		}

		if (currentUserMarathonScoreIndex === undefined) return null;
		return currentUserMarathonScoreIndex;
	};

	const checkCurrentUserPosition = () => {
		const ROOKIE = [0, 25];
		const CORE = [26, 46];
		const SUPER = [47, 53];
		const PEAK = [54, 64];
		const SUPERSTAR = [65, 70];

		const currentUserIndex = findUserIndex();

		if (currentUserIndex >= ROOKIE[0] && currentUserIndex <= ROOKIE[1])
			return setVisibleRank(1);
		if (currentUserIndex >= CORE[0] && currentUserIndex <= ROOKIE[1])
			return setVisibleRank(2);
		if (currentUserIndex >= SUPER[0] && currentUserIndex <= ROOKIE[1])
			return setVisibleRank(3);
		if (currentUserIndex >= PEAK[0] && currentUserIndex <= ROOKIE[1])
			return setVisibleRank(4);
		if (currentUserIndex >= SUPERSTAR[0] && currentUserIndex <= ROOKIE[1])
			return setVisibleRank(5);
	};

	const performersArray = (lower, upper) =>
		topPerformersArray &&
		topPerformersArray.length &&
		topPerformersArray.map((performer, index) => {
			if (index >= lower && index <= upper) {
				return (
					<RankingCard
						key={performer.id}
						rankPosition={index + 1}
						currentUser={currentUser.id == performer.userId}
						username={performer.username}
						bodyMoves={performer.bodyMoves}
					/>
				);
			}
		});
	return (
		<ScreenContainer backgroundColor={COLORS.dark} noTouch={true}>
			<ContentContainer>
				<PageHeaderLarge title="Marathon" />
				<MarathonLeagueCard visibleRank={visibleRank} />
				<Scroller
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainer}
				>
					{/* {visibleRank === 1 &&
						mockArray(
							ranks[visibleRank].limits.min,
							ranks[visibleRank].limits.max
						)} */}
					{visibleRank === 1 && performersArray(0, 25)}
					{visibleRank === 2 && performersArray(26, 46)}
					{visibleRank === 3 && performersArray(47, 53)}
					{visibleRank === 4 && performersArray(54, 64)}
					{visibleRank === 5 && performersArray(65, 70)}

					{/* <PromotionNotifyCard league={3} /> */}
				</Scroller>
			</ContentContainer>
		</ScreenContainer>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
});

export default MarathonScreen;
