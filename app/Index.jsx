import * as React from "react";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./navigator/AppNavigator";
import AuthNavigator from "./navigator/AuthNavigator";
import GenericErrorMessage from "./components/form/fields/GenericErrorMessage";
import LoadApp from "../app/utilities/LoadApp";
import Loader from "./components/Loader";
import VerifyEmailNavigator from "./navigator/VerifyCodeNavigator";

import { fonts } from "./theme/fonts";
import {
	getCurrentUser,
	setCurrentUser,
	setVerifySuccess,
} from "./store/reducers/userReducer";
import { restoreStoredCurrentUser } from "./utilities/startup_scripts";
import {
	selectShowGenericErrorDialog,
	selectUiIsLoading,
	selectVideoLoading,
} from "./store/reducers/uiReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { stages, switchStage } from "./store/reducers/resetPasswordReducer";
import authFuncs from "./store/thunks/auth_functions";

const Index = () => {
	const dispatch = useDispatch();

	/** Selectors */
	const isLoading = useSelector(selectUiIsLoading);
	const videoLoading = useSelector(selectVideoLoading);
	const error = useSelector(selectShowGenericErrorDialog);
	const currentUser = useSelector(getCurrentUser);

	// authFuncs.logOut(dispatch);

	React.useEffect(async () => {
		const currentUser = await restoreStoredCurrentUser();
		dispatch(switchStage(stages.REQUEST_LINK));
		dispatch(setVerifySuccess(false));

		if (currentUser) {
			dispatch(setCurrentUser(currentUser));
		}
	}, []);

	return (
		<LoadApp {...{ fonts }}>
			<GenericErrorMessage error={error} />
			<Loader visible={isLoading | videoLoading} />
			<StatusBar style="auto" />
			{currentUser && currentUser.isVerified && <AppNavigator />}
			{currentUser && currentUser.isRegistered && !currentUser.isVerified && (
				<VerifyEmailNavigator />
			)}
			{!currentUser && <AuthNavigator />}
		</LoadApp>
	);
};

export default Index;
