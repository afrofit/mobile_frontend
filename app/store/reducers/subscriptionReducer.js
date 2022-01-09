import subscriptionApi from "../../api/subscription/subscriptionApi";
import useApi from "../../hooks/useApi";

// import { getCurrentSubscription } from "../../api/subscription";

export const UNSUBSCRIBED = "unsubscribed";

const intialState = {
	subscription: {
		amountInGBP: 0,
		endDate: "",
		id: "",
		isExpired: true,
		name: UNSUBSCRIBED,
		startDate: "",
	},
};

const SET_SUBSCRIPTION = "subscription/setSubscription";
const RESET_SUBSCRIPTION = "subscription/resetSubscription;";

export function subscriptionReducer(state = intialState, action) {
	if (action.type === RESET_SUBSCRIPTION) {
		return {
			...state,
			subscription: {
				amountInGBP: 0,
				endDate: "",
				id: "",
				isExpired: true,
				name: UNSUBSCRIBED,
				startDate: "",
			},
		};
	} else if (action.type === SET_SUBSCRIPTION) {
		const { createdAt, name, id, isExpired, endDate, amountInGBP } =
			action.payload;

		return {
			...state,
			subscription: {
				amountInGBP,
				endDate,
				id,
				isExpired,
				name,
				startDate: createdAt,
			},
		};
	}
	return state;
}

//Action Creators
export const setSubscription = (subscription) => ({
	type: SET_SUBSCRIPTION,
	payload: subscription,
});

export const resetSubscription = () => ({
	type: RESET_SUBSCRIPTION,
	payload: null,
});

export function requestSubscription() {
	return (dispatch) => {
		const getSubscriptionApi = useApi(subscriptionApi.getCurrentSubscription);
		// const result = getSubscriptionApi.request();
		// const result = getSubscriptionApi;
		getSubscriptionApi.request().then(({ data }) => {
			console.log("Got it!", data);
			return dispatch(setSubscription(data));
		});
		// const getCurrentUserSubscription = async () => {

		// 	if (!result.ok) {
		// 		if (result.data) {
		// 			console.error("Error getting subscription info", result.data);
		// 		} else {
		// 			console.error("Error getting subscription", result.data);
		// 		}
		// 		return;
		// 	}
		// 	console.log("From subs-reducer thunk", result.data);
		// 	return result.data;
		// };
		// getCurrentUserSubscription.then((currSub) =>
		// 	dispatch(setSubscription(currSub))
		// );
	};
}

//Selectors
export const getSubscription = (state) => state.subscription.subscription;
