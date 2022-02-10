import * as React from "react";
import { StatusBar } from "expo-status-bar";

import LoadApp from "../app/utilities/LoadApp";
import { fonts } from "./theme/fonts";
import AuthNavigator from "./navigator/AuthNavigator";
import AppNavigator from "./navigator/AppNavigator";
import { getCurrentUser, setCurrentUser } from "./store/reducers/userReducer";
import { useDispatch } from "react-redux";
import VerifyEmailNavigator from "./navigator/VerifyCodeNavigator";
import { useSelector } from "react-redux";
import { requestCurrentUserSubscription } from "./store/reducers/subscriptionReducer";
import { requestUserDailyActivity } from "./store/reducers/activityReducer";
import useAuth from "./hooks/useAuth";
import { restoreStoredCurrentUser } from "./utilities/startup_scripts";

const Index = () => {
	const dispatch = useDispatch();
	const { logOut } = useAuth();

	/**Local State */
	const [error, setError] = React.useState(null);

	/**Selectors */
	const currentUser = useSelector(getCurrentUser);

	// logOut();

	React.useEffect(async () => {
		const currentUser = await restoreStoredCurrentUser();
		if (currentUser) {
			dispatch(setCurrentUser(currentUser));
			dispatch(requestUserDailyActivity());
			dispatch(requestCurrentUserSubscription());
		}
	}, []);

	return (
		<LoadApp {...{ fonts }}>
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
