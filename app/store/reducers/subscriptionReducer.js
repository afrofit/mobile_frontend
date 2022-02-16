import { createSlice } from "@reduxjs/toolkit";
import subscriptionApi from "../../api/subscription/subscriptionApi";
import { fetchCurrentUserSubscription } from "../../api/subscription/subscriptionThunkControllers";
import useApi from "../../hooks/useApi";

export const UNSUBSCRIBED = "unsubscribed";

const initialState = {
	subscription: {
		endDate: "",
		id: "",
		isExpired: true,
		name: UNSUBSCRIBED,
		startDate: "",
	},
};

const subscriptionSlice = createSlice({
	name: "subscription",
	initialState,
	reducers: {
		resetSubscription(state, { payload }) {
			state.subscription = {
				endDate: "",
				id: "",
				isExpired: true,
				name: UNSUBSCRIBED,
				startDate: "",
			};
		},
		setSubscription(state, { payload }) {
			const { createdAt, name, id, isExpired, endDate } = payload;
			state.subscription = {
				startDate: createdAt,
				endDate,
				id,
				isExpired,
				name,
			};
		},
	},
});

export const { setSubscription, resetSubscription } = subscriptionSlice.actions;

/* *Thunks */
export function requestCurrentUserSubscription() {
	return (dispatch, getState) => {
		fetchCurrentUserSubscription().then((response) => {
			// console.log("Subscription Response from Thunk", response);
			// const currentState = getState();
			// if (currentState.subscription.subscription.name === UNSUBSCRIBED){

			// }
			// if (reponse)
			if (!response) {
				return dispatch(resetSubscription(response));
			}
			return dispatch(setSubscription(response));
		});
	};
}

//Selectors
export const getCurrentUserSubscription = (state) =>
	state.subscription.subscription;

export default subscriptionSlice.reducer;
