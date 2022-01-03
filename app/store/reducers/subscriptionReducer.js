import {
	calculateSubscriptionDuration,
	TODAY,
} from "../../utilities/calculators";

// export enum SubscriptionName {
// 	TRIAL = "Trial",
// 	MONTH = "Monthly",
// 	HALF_YEAR = "Half-Yearly",
// 	YEAR = "Yearly",
// 	UNSUBSCRIBED = "Unsubscribed",
// }

// export enum SubscriptionDuration {
// 	TRIAL = 7,
// 	MONTH = 35,
// 	HALF_YEAR = 185,
// 	YEAR = 365,
// }

export const subscriptionTypes = Object.freeze({
	TRIAL: { name: "trial", durationInDays: 7 },
	MONTH: { name: "monthly", durationInDays: 35 },
	HALF_YEAR: { name: "half-yearly", durationInDays: 185 },
	YEARLY: { name: "yearly", durationInDays: 365 },
	UNSUBSCRIBED: { name: "unsubscribed", durationInDays: 0 },
});

const intialState = {
	subscription: {
		name: "",
		durationInDays: 0,
		startDate: "",
		endDate: "",
		amountInGBP: 0,
		isExpired: true,
	},
};

const START_SUBSCRIPTION = "subscription/startSubscription";
const CANCEL_SUBSCRIPTION = "subscription/cancelSubscription;";

export function subscriptionReducer(state = intialState, action) {
	if (action.type === CANCEL_SUBSCRIPTION) {
		return {
			...state,
			subscription: {
				startDate: null,
				endDate: null,
				amountInGBP: 0,
				durationInDays: 0,
				name: subscriptionTypes.UNSUBSCRIBED.name,
				isExpired: true,
			},
		};
	} else if (action.type === START_SUBSCRIPTION) {
		console.log("Action,", action);
		const endDate = calculateSubscriptionDuration(
			action.payload.createdAt,
			action.payload.durationInDays
		);
		return {
			...state,
			subscription: {
				startDate: action.payload.createdAt,
				endDate,
				name: action.payload.name,
				durationInDays: action.payload.durationInDays,
				isExpired: action.payload.isExpired,
				amountInGBP: action.payload.amountInGBP,
			},
		};
	}
	return state;
}

//Action Creators
export const startSubscription = (subscription) => ({
	type: START_SUBSCRIPTION,
	payload: subscription,
});

export const endSubscription = () => ({
	type: CANCEL_SUBSCRIPTION,
	payload: null,
});

//Selectors
export const getSubscription = (state) => state.subscription.subscription;
