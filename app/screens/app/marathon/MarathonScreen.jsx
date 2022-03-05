import * as React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import MarathonLeagueCard from "../../../components/cards/MarathonLeagueCard";
import { ContentContainer } from "../../../components/ContentContainer";
import PageHeaderLarge from "../../../components/headers/PageHeaderLarge";

import { COLORS } from "../../../theme/colors";
import ScreenContainer from "../../../utilities/ScreenContainer";
import RankingCard from "../../../components/cards/RankingCard";
import PromotionNotifyCard from "../../../components/cards/PromotionNotifyCard";
import { BORDER_RADIUS_SMALL } from "../../../theme/globals";

const Scroller = styled.ScrollView`
	max-height: 100%;
	width: 100%;
`;

const MarathonScreen = ({}) => {
	return (
		<ScreenContainer backgroundColor={COLORS.dark} noTouch={true}>
			<ContentContainer>
				<PageHeaderLarge title="Marathon" />
				<MarathonLeagueCard />
				<Scroller
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainer}
				>
					<RankingCard rankPosition={1} />
					<RankingCard rankPosition={2} />
					<RankingCard rankPosition={3} />
					<RankingCard rankPosition={4} />
					<RankingCard currentUser={true} rankPosition={5} />
					<PromotionNotifyCard league={1} />
					<RankingCard rankPosition={6} />
				</Scroller>
			</ContentContainer>
		</ScreenContainer>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
		// padding: 20,
	},
});

export default MarathonScreen;
