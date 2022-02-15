import { createSlice } from "@reduxjs/toolkit";
import { fetchUserActivity } from "../../api/activity/activityThunkControllers";

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
		setTotalUserActivity(state, { payload }) {
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
	setTotalUserActivity,
	resetUserDailyActivity,
} = performanceSlice.actions;

/**Selectors */
export const getDailyActivity = (state) => state.activity.dailyActivity;
export const getPerformanceData = (state) => state.activity.userStats;

/**Thunks */
export function requestUserDailyActivity() {
	return (dispatch, getState) => {
		fetchUserActivity().then((response) => {
			// console.log("DailyActivity Response from Thunk", response);
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
					setTotalUserActivity({
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

export function saveUserDailyActivity() {
	return (_, getState) => {};
}

/**Reducer */
export default performanceSlice.reducer;
