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
	/* background-color: red; */
	width: 100%;
`;

const MarathonLeagueCard = ({}) => {
	return (
		<Card color={COLORS.darker}>
			<HorizontalScroller horizontal showsHorizontalScrollIndicator={false}>
				{Object.keys(ranks).map((badge) => {
					return (
						<RankBadge
							key={badge}
							showLabel={false}
							size="50"
							currentUser={ranks[badge].id === 3}
							rankCode={badge}
						/>
					);
				})}

				{/* <RankBadge showLabel={false} size="50" />
				<RankBadge showLabel={false} size="50" />
				<RankBadge showLabel={false} size="50"  />
				<RankBadge showLabel={false} size="50" /> */}
			</HorizontalScroller>
			<Spacer />
			<Font variant="bold-caps" color={COLORS.white}>
				ROOKIE TRAINER LEAGUE
			</Font>
			<Spacer h="10px" />
			<Font variant="small-caps" color={COLORS.grayDark}>
				TOP 5 ADVANCE // 2 DAYS LEFT
			</Font>
			<Spacer h="20px" />
			<ThreeStarsElement variant="yellow" />
		</Card>
	);
};

export default MarathonLeagueCard;
