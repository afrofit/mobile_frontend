import * as React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import Button from "../../../components/buttons/Button";
import PageHeaderHuge from "../../../components/headers/PageHeaderHuge";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import useVideo from "../../../hooks/useVideo";
import useDisableHardwareBack from "../../../hooks/useDisableHardwareBack";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../theme/globals";
import Loader from "../../../components/Loader";

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
	width: 90%;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
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

const VideoContainer = styled.View`
	align-items: center;
	height: ${DEVICE_HEIGHT};
	width: ${DEVICE_WIDTH};
	position: absolute;
	z-index: -2;
`;

const PerformanceResultScreen = ({ navigation, route }) => {
	const { success, videoUrl, message, contentStoryId } = route.params.data;

	/** Local State */
	const [videoStatus, setVideoStatus] = React.useState();
	const [videoLoading, setVideoLoading] = React.useState(true);

	/** Set up VideoRef */
	const videoRef = React.useRef(null);
	const { handleUnloadVideo } = useVideo(videoRef, videoStatus);

	/** Disable Back Button */
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	/** Video monitoring functions */
	const _onPlaybackStatusUpdate = async (status) => {
		if (status.didJustFinish) {
		}
		setVideoStatus(status);
	};

	const handleProceed = () => {
		success
			? navigation.push(routes.home.STORY, { contentStoryId })
			: navigation.navigate(routes.ROOT, { contentStoryId });
	};

	return (
		<>
			<Loader visible={videoLoading} message="Loading content" />
			<ScreenContainer backgroundColor={COLORS.dark}>
				<Container>
					<Spacer />
					<PageHeaderHuge title={success ? "Success" : "Fail"} />
					<TopSection />
					<MidSection>
						<Spacer />
						<InstructionTextWhite>{message}</InstructionTextWhite>
						<Spacer />
					</MidSection>
					<Button
						variant="white"
						text={success ? "Continue" : "Quit Chapter"}
						// onPress={() => navigation.navigate(routes.home.STORY)}
						onPress={handleProceed}
					/>
					<Button
						variant="red"
						text={success ? "Exit Story" : "Retry Chapter"}
						onPress={() =>
							// navigation.navigate(success ? routes.ROOT : routes.home.STORY)
							handleProceed
						}
					/>
					<Spacer />
					<VideoContainer>
						<Video
							ref={videoRef}
							source={{
								uri: videoUrl,
							}}
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

export default PerformanceResultScreen;
