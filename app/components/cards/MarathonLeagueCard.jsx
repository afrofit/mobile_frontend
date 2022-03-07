import * as React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";

import { ranks } from "../../data/rank-data";
import Font from "../../elements/Font";
import ThreeStarsElement from "../../elements/ThreeStarsElement";
import { COLORS } from "../../theme/colors";
import Spacer from "../../utilities/Spacer";
import RankBadge from "../RankBadge";
import Card from "./Card";

const HorizontalScroller = styled.ScrollView`
	width: 100%;
`;

const MarathonLeagueCard = ({ visibleRank }) => {
	return (
		<Card color={COLORS.darker}>
			<HorizontalScroller horizontal showsHorizontalScrollIndicator={false}>
				{Object.keys(ranks).map((badge) => {
					return (
						<RankBadge
							key={badge}
							showLabel={false}
							size="50"
							currentUser={ranks[badge].id === visibleRank}
							rankCode={badge}
						/>
					);
				})}
			</HorizontalScroller>
			<Spacer h="5px" />
			<Font variant="bold" color={COLORS.white}>
				{ranks[visibleRank].name} Trainer League
			</Font>

			<Spacer h="20px" />
			<ThreeStarsElement variant="yellow" />
		</Card>
	);
};

export default MarathonLeagueCard;
