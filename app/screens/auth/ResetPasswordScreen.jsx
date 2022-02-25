import * as React from "react";

import ResetEmailForm from "./ResetPasswordScreens/ResetEmailForm";
import VerifyCodeForm from "./ResetPasswordScreens/VerifyCodeForm";
import NewPasswordForm from "./ResetPasswordScreens/NewPasswordForm";
import {
	getStage,
	stages,
	switchStage,
} from "../../store/reducers/resetPasswordReducer";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordScreen = ({ navigation }) => {
	const currentStage = useSelector(getStage);

	const [email, setEmail] = React.useState(null);

	return (
		<>
			{currentStage === stages.REQUEST_LINK && (
				<ResetEmailForm
					stages={stages}
					// switchStage={switchStage}
					navigation={navigation}
					setEmail={setEmail}
				/>
			)}
			{currentStage === stages.VERIFY && (
				<VerifyCodeForm
					stages={stages}
					// switchStage={switchStage}
					navigation={navigation}
					email={email}
				/>
			)}
			{currentStage === stages.RESET && (
				<NewPasswordForm navigation={navigation} />
			)}
		</>
	);
};

export default ResetPasswordScreen;
