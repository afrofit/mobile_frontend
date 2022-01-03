const initialState = {
	dailyActivity: {
		caloriesBurned: 170000,
		bodyMovements: 0,
	},
	userStats: {
		totalCaloriesBurned: 99660,
		totalBodyMovements: 17000,
		totalHoursDanced: 0,
		totalDaysActive: 0,
	},
};

export function performanceReducer(state = initialState, action) {
	if (action.type === SET_USER_DAILY_ACTIVITY) {
		const { caloriesBurned, bodyMovements } = action.payload;
		const newCalorieBurned =
			state.dailyActivity.caloriesBurned + caloriesBurned;
		const newBodyMovements = state.dailyActivity.bodyMovements + bodyMovements;
		return {
			...state,
			dailyActivity: {
				caloriesBurned: newCalorieBurned,
				bodyMovements: newBodyMovements,
			},
		};
	} else if (action.type === RESET_USER_DAILY_ACTIVITY) {
		return { ...state, dailyActivity: { caloriesBurned: 0, bodyMovements: 0 } };
	} else if (action.type === SET_TOTAL_USER_ACTIVITY) {
		return { ...state, userStats: action.payload };
	}
	return state;
}

//Constants

const SET_USER_DAILY_ACTIVITY = "activity/setUserDailyActivity";
const SET_TOTAL_USER_ACTIVITY = "activity/setTotalUserActivity";
const RESET_USER_DAILY_ACTIVITY = "activity/setUserDailyActivity";

// Action Creators
export const setUserDailyActivity = (activity) => ({
	type: SET_USER_DAILY_ACTIVITY,
	payload: activity,
});

export const setTotalUserActivity = (stats) => ({
	type: SET_TOTAL_USER_ACTIVITY,
	payload: stats,
});

export const resetUserDailyActivity = () => ({
	type: RESET_USER_DAILY_ACTIVITY,
	payload: null,
});

// Selectors
export const getTodaysActivity = (state) => state.activity.dailyActivity;
export const getTotalUserActivity = (state) => state.activity.userStats;
