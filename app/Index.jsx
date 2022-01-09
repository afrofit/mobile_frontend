import * as React from "react";
import { StatusBar } from "expo-status-bar";

import LoadApp from "../app/utilities/LoadApp";
import { fonts } from "./theme/fonts";
import AuthNavigator from "./navigator/AuthNavigator";
import AppNavigator from "./navigator/AppNavigator";
import useAuth from "./hooks/useAuth";
import { getCurrentUser, setCurrentUser } from "./store/reducers/userReducer";
import { useDispatch } from "react-redux";
import VerifyEmailNavigator from "./navigator/VerifyCodeNavigator";
import { useSelector } from "react-redux";
import authStorage from "./api/storage";
import {
	resetSubscription,
	setSubscription,
} from "./store/reducers/subscriptionReducer";
import subscriptionApi from "./api/subscription/subscriptionApi";
import useSubscription from "./hooks/useSubscription";

const Index = () => {
	const dispatch = useDispatch();
	const [error, setError] = React.useState(null);

	const currentUser = useSelector(getCurrentUser);
	// const storeSubscription = useSelector(getSubscription);

	const { updateSubscribedUser } = useSubscription();

	//Direct API calls
	const getSubscriptionApi = useApi(subscriptionApi.getCurrentSubscription);
	const expireSubscriptionApi = useApi(subscriptionApi.cancelSubscription);

	const getCurrentUserSubscription = async () => {
		const result = await getSubscriptionApi.request();

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
				console.error("error", result.data);
			} else {
				setError("An unexpected error occurred.");
				console.error("error", result.data);
			}
			return;
		}
		return result.data;
	};

	const expireUserSubscription = async (subscriptionId) => {
		const result = await expireSubscriptionApi.request(subscriptionId);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
				console.error("error", result.data);
			} else {
				setError("An unexpected error occurred.");
				console.error("error", result.data);
			}
			return;
		}
		return result.data;
	};

	React.useEffect(() => {
		const TODAY = new Date();
		let currentSub;

		(async function restoreUser() {
			const user = await authStorage.getUser();
			if (user) {
				dispatch(setCurrentUser(user));
				currentSub = await getCurrentUserSubscription();
				console.log("Today", TODAY, "Current Sub End Date", currentSub.endDate);
				if (!currentSub) {
					dispatch(resetSubscription());
				} else if (new Date(currentSub.endDate) < TODAY) {
					dispatch(resetSubscription());
					const { response } = await expireUserSubscription(currentSub.id);
					updateSubscribedUser(response);
					console.log("From index, this is expired currentSub", expiredSub);
				} else {
					dispatch(setSubscription(currentSub));
				}
			}
			console.log("From index, this is current sub: ", currentSub);

			/*
			 * If there is not current Subscription,
			 * Then just let the default state be on the store
			 * If there is a current Subscription,
			 * Check if user.endDate against today.
			 * If expired, set User and Subscription Objects to expired
			 * If not, set currentSub as store.currentSub
			 */
		})();
	}, [dispatch]);

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
