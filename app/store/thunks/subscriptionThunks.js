import { subscriptionCreate } from "../../api/subscription/subscriptionApi";
import { setSubscription } from "../reducers/subscriptionReducer";
import {
	finishedRequest,
	hideGenericErrorDialog,
	newRequest,
	showGenericErrorDialog,
} from "../reducers/uiReducer";

/** Fetch home screen stories */

export function createSubscription(value) {
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
