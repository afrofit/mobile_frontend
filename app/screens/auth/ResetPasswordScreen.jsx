import * as React from "react";

import ResetEmailForm from "./ResetPasswordScreens/ResetEmailForm";
import VerifyCodeForm from "./ResetPasswordScreens/VerifyCodeForm";
import NewPasswordForm from "./ResetPasswordScreens/NewPasswordForm";

const ResetPasswordScreen = ({ navigation }) => {
	const stages = Object.freeze({
		REQUEST_LINK: "REQUEST_LINK",
		VERIFY: "VERIFY",
		RESET: "RESET",
	});

	const [stage, setStage] = React.useState(stages.REQUEST_LINK);
	const [email, setEmail] = React.useState(null);

	const switchStage = (stage) => {
		setStage(stage);
	};

	return (
		<>
			{stage === stages.REQUEST_LINK && (
				<ResetEmailForm
					stages={stages}
					switchStage={switchStage}
					navigation={navigation}
					setEmail={setEmail}
				/>
			)}
			{stage === stages.VERIFY && (
				<VerifyCodeForm
					stages={stages}
					switchStage={switchStage}
					navigation={navigation}
					email={email}
				/>
			)}
			{stage === stages.RESET && <NewPasswordForm navigation={navigation} />}
		</>
	);
};

export default ResetPasswordScreen;
