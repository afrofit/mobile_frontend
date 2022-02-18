import * as React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { StyleSheet } from "react-native";

import Button from "../../../components/buttons/Button";
import PageHeaderHuge from "../../../components/headers/PageHeaderHuge";
import ThreeStarsElement from "../../../elements/ThreeStarsElement";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import VideoContainer from "../../../utilities/VideoContainer";
import useVideo from "../../../hooks/useVideo";
import Loader from "../../../components/Loader";

//This screen is where video intro of storyline is played. Very important!
const Container = styled.View`
	height: 100%;
	width: 100%;
	align-items: center;
`;

const PageSection = styled.View`
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const TopSection = styled.View`
	flex: 1;
`;

const MidSection = styled(PageSection)`
	/* flex: 0.9; */
	width: 90%;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
	/* background-color: blue; */
`;

const Font = styled.Text`
	text-transform: uppercase;
	letter-spacing: 3px;
	line-height: 25px;
	text-align: center;
`;

const InstructionText = styled(Font)`
	font-family: "Regular";
	font-size: 13px;
	color: ${COLORS.yellow};
`;

const InstructionTextWhite = styled(InstructionText)`
	color: ${COLORS.white};
	width: 300px;
`;

const FinishStoryScreen = ({ navigation, route }) => {
	const { message, videoUrl } = route.params.data;

	const [videoStatus, setVideoStatus] = React.useState();
	const [videoLoading, setVideoLoading] = React.useState(true);

	const videoRef = React.useRef(null);

	const { handleUnloadVideo } = useVideo(videoRef, videoStatus);

	const _onPlaybackStatusUpdate = async (status) => {
		// if (status.didJustFinish) return handleUserResults("success");

		setVideoStatus(status);
	};

	const handleFinishStory = () => {
		handleUnloadVideo().then(() => navigation.navigate(routes.ROOT));
	};

	return (
		<>
			<Loader visible={videoLoading} message="Loading content" />

			<ScreenContainer backgroundColor={COLORS.dark}>
				<Container>
					<Spacer />
					<PageHeaderHuge title="Completed" />
					<TopSection />
					<MidSection>
						<ThreeStarsElement />
						<Spacer />
						<InstructionTextWhite>{message}</InstructionTextWhite>
						<Spacer />
						<ThreeStarsElement />
					</MidSection>
					<Button
						variant="white"
						text={"Finish Story"}
						onPress={handleFinishStory}
					/>

					<Spacer />
					<VideoContainer>
						<Video
							ref={videoRef}
							source={{ uri: videoUrl }}
							style={styles.video}
							resizeMode={Video.RESIZE_MODE_COVER}
							onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
							shouldPlay={true}
							isLooping={false}
							rate={2}
							onLoadStart={() => setVideoLoading(false)}
						/>
					</VideoContainer>
				</Container>
			</ScreenContainer>
		</>
	);
};

const styles = StyleSheet.create({
	video: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
});

export default FinishStoryScreen;
