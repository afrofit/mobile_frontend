import * as React from "react";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./navigator/AppNavigator";
import AuthNavigator from "./navigator/AuthNavigator";
import GenericErrorMessage from "./components/form/fields/GenericErrorMessage";
import LoadApp from "../app/utilities/LoadApp";
import Loader from "./components/Loader";
import useAuth from "./hooks/useAuth";
import VerifyEmailNavigator from "./navigator/VerifyCodeNavigator";

import { fonts } from "./theme/fonts";
import { getCurrentUser, setCurrentUser } from "./store/reducers/userReducer";
import { restoreStoredCurrentUser } from "./utilities/startup_scripts";
import {
	selectShowGenericErrorDialog,
	selectUiIsLoading,
} from "./store/reducers/uiReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { stages, switchStage } from "./store/reducers/resetPasswordReducer";

const Index = () => {
	const dispatch = useDispatch();
	const { logOut } = useAuth();

	/** Selectors */
	const isLoading = useSelector(selectUiIsLoading);
	const error = useSelector(selectShowGenericErrorDialog);
	const currentUser = useSelector(getCurrentUser);

	// logOut();

	React.useEffect(async () => {
		const currentUser = await restoreStoredCurrentUser();
		dispatch(switchStage(stages.REQUEST_LINK));
		if (currentUser) {
			dispatch(setCurrentUser(currentUser));
		}
	}, []);

	return (
		<LoadApp {...{ fonts }}>
			<GenericErrorMessage error={error} />
			<Loader visible={isLoading} />

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
