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

const MarathonLeagueCard = ({ currentUserRank = 1 }) => {
	return (
		<Card color={COLORS.darker}>
			<HorizontalScroller horizontal showsHorizontalScrollIndicator={false}>
				{Object.keys(ranks).map((badge) => {
					return (
						<RankBadge
							key={badge}
							showLabel={false}
							size="50"
							currentUser={ranks[badge].id === currentUserRank}
							rankCode={badge}
						/>
					);
				})}
			</HorizontalScroller>
			<Spacer />
			<Font variant="bold-caps" color={COLORS.white}>
				{ranks[currentUserRank].name} Trainer League
			</Font>
			<Spacer h="10px" />
			<Font variant="small-caps" color={COLORS.grayDark}>
				TOP {ranks[currentUserRank].advancers} ADVANCE // 2 DAYS LEFT
			</Font>
			<Spacer h="20px" />
			<ThreeStarsElement variant="yellow" />
		</Card>
	);
};

export default MarathonLeagueCard;
