import { createSlice } from "@reduxjs/toolkit";

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
	contentUpdated: false,
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
			state.dailyActivity = {
				caloriesBurned: (state.dailyActivity.caloriesBurned += caloriesBurned),
				bodyMoves: (state.dailyActivity.bodyMoves += bodyMoves),
			};
		},
		setContentUpdated(state, { payload }) {
			state.contentUpdated = payload;
		},
		setUserPerformanceData(state, { payload }) {
			state.userStats = payload;
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
	setUserPerformanceData,
	resetUserDailyActivity,
	setContentUpdated,
} = performanceSlice.actions;

/**Selectors */
export const getDailyActivity = (state) => state.activity.dailyActivity;
export const getPerformanceData = (state) => state.activity.userStats;
export const getContentUpdated = (state) => state.activity.contentUpdated;

/**Reducer */
export default performanceSlice.reducer;
