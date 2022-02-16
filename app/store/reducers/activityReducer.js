import { createSlice } from "@reduxjs/toolkit";
import {
	fetchUserActivity,
	saveUserActivity,
} from "../../api/activity/activityThunkControllers";

const initialState = {
	dailyActivity: {
		caloriesBurned: 0,
		bodyMoves: 0,
	},
	userStats: {
		totalCaloriesBurned: 0,
		totalBodyMoves: 0,
		totalTimeDancedInMilliseconds: 0,
		totalDaysActive: 0,
	},
};

const performanceSlice = createSlice({
	name: "performance",
	initialState,
	reducers: {
		setUserDailyActivity(state, { payload }) {
			state.dailyActivity = payload;
		},
		updateUserDailyActivity(state, { payload }) {
			const { caloriesBurned, bodyMoves } = payload;
			console.log("About to update body moves", bodyMoves);
			state.dailyActivity = {
				caloriesBurned: (state.dailyActivity.caloriesBurned += caloriesBurned),
				bodyMoves: (state.dailyActivity.bodyMoves += bodyMoves),
			};
		},
		initializeTotalUserActivity(state, { payload }) {
			// console.log("Total Activity Payload", payload);
			const {
				totalBodyMoves,
				totalCaloriesBurned,
				totalDaysActive,
				totalTimeDancedInMilliseconds,
			} = payload;
			state.userStats = {
				totalBodyMoves,
				totalCaloriesBurned,
				totalTimeDancedInMilliseconds,
				totalDaysActive,
			};
		},
		updateTotalUserActivity(state, { payload }) {
			state.userStats.totalBodyMoves += payload.totalBodyMoves;
			state.userStats.totalCaloriesBurned += payload.totalCaloriesBurned;
			state.userStats.totalTimeDancedInMilliseconds += payload.totalDaysActive;
			state.userStats.totalDaysActive += payload.totalTimeDancedInMilliseconds;
		},
		resetUserDailyActivity(state) {
			state.dailyActivity = { caloriesBurned: 0, bodyMoves: 0 };
		},
		resetUserPerformance(state) {
			state.userStats = {
				totalCaloriesBurned: 0,
				totalBodyMoves: 0,
				totalTimeDancedInMilliseconds: 0,
				totalDaysActive: 0,
			};
		},
	},
});

export const {
	setUserDailyActivity,
	updateUserDailyActivity,
	initializeTotalUserActivity,
	resetUserDailyActivity,
} = performanceSlice.actions;

/**Selectors */
export const getDailyActivity = (state) => state.activity.dailyActivity;
export const getPerformanceData = (state) => state.activity.userStats;

/**Thunks */
export function requestUserDailyActivity() {
	return (dispatch, getState) => {
		fetchUserActivity().then((response) => {
			if (response) {
				const { daily, performance } = response;
				const { bodyMoves, caloriesBurned } = daily;
				const {
					totalCaloriesBurned,
					totalBodyMoves,
					totalTimeDancedInMilliseconds,
					totalDaysActive,
				} = performance;
				dispatch(
					setUserDailyActivity({
						bodyMoves,
						caloriesBurned,
					})
				);
				return dispatch(
					initializeTotalUserActivity({
						totalCaloriesBurned,
						totalBodyMoves,
						totalTimeDancedInMilliseconds,
						totalDaysActive,
					})
				);
			}
			return dispatch(resetUserDailyActivity());
		});
	};
}

export function saveUserActivityData(payload) {
	return () => {
		saveUserActivity(payload)
			.then((res) => {
				//do something here\
				// console.log("Activity Response from Thunk", res);
			})
			.catch((error) => console.error(error));
	};
}

/**Reducer */
export default performanceSlice.reducer;
