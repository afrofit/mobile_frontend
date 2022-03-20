import Purchases from "react-native-purchases";
import {
	subscriptionCancel,
	subscriptionCreate,
	getCurrentUserSubscription,
} from "../../api/subscription/subscriptionApi";
import { fetchCurrentUserSubscription } from "../../api/subscription/subscriptionThunkControllers";
import {
	resetSubscription,
	setSubscription,
} from "../reducers/subscriptionReducer";
import {
	finishedRequest,
	hideGenericErrorDialog,
	newRequest,
	setShowSubscribeDialog,
	showGenericErrorDialog,
} from "../reducers/uiReducer";

/** Cancel and Create Subscription */
export function cancelAndroidSubscription(userId, productIdentifier) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		subscriptionCancelAndroid(userId, productIdentifier)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				console.log("Cancel Subscription Response");
				const { data, ok } = response;
				if (data && ok) {
					return dispatch(resetSubscription());
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't log you in. Retry?"));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function cancelSubscription(subscriptionId) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		subscriptionCancel(subscriptionId)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;
				if (data && ok) {
					return dispatch(resetSubscription());
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't log you in. Retry?"));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}
/* *Thunks */
export function requestCurrentUserSubscription() {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		getCurrentUserSubscription()
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;
				if (data && ok) {
					return dispatch(setSubscription(data));
				} else if (!ok && data) {
					dispatch(resetSubscription(data));

					throw new Error(data);
				} else if (!ok && !data) {
					dispatch(
						showGenericErrorDialog("Can't fetch your subscription. Retry?")
					);
					throw new Error("Error. Cannot fetch your subscription.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function createSubscription(pack) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		Purchases.purchasePackage(pack)
			.then(({ purchaserInfo }) => {
				dispatch(finishedRequest());
				return purchaserInfo;
			})
			.then((purchaserInfo) => {
				if (purchaserInfo.entitlements.active.premium !== "undefined") {
					// unlock content
					dispatch(setShowSubscribeDialog(false));
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function createSubscriptionOld(value) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		subscriptionCreate(value)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;
				if (data && ok) {
					dispatch(setSubscription(data));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't log you in. Retry?"));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}
