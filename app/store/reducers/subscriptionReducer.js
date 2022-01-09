import subscriptionApi from "../../api/subscription/subscriptionApi";
import useApi from "../../hooks/useApi";

// import { getCurrentSubscription } from "../../api/subscription";

export const UNSUBSCRIBED = "unsubscribed";

const intialState = {
	subscription: {
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
				endDate: "",
				id: "",
				isExpired: true,
				name: UNSUBSCRIBED,
				startDate: "",
			},
		};
	} else if (action.type === SET_SUBSCRIPTION) {
		const {
			createdAt: startDate,
			name,
			id,
			isExpired,
			endDate,
		} = action.payload;
		console.log("From Set Subscription Reducer", startDate);
		return {
			...state,
			subscription: {
				endDate,
				id,
				isExpired,
				name,
				startDate,
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
		getSubscriptionApi.request().then(({ data }) => {
			console.log("Got it!", data);
			return dispatch(setSubscription(data));
		});
	};
}

//Selectors
export const getSubscription = (state) => state.subscription.subscription;
